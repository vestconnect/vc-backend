import { inject, injectable } from 'tsyringe';
import IProductsUserRepository from '@modules/products/repositories/IProductsUserRepository';
import IProductsTagsRepository from '@modules/products/repositories/IProductsTagsRepository';
import ISelectedProductsUserNotificationsRepository from '@modules/products/repositories/ISelectedProductsUserNotificationsRepository';
import IProductsUserNotificationsRepository from '@modules/products/repositories/IProductsUserNotificationsRepository';

@injectable()
class SelectProductUserServices {
    constructor(
        @inject('ProductsTagsRepository')
        private productsTagsRepository: IProductsTagsRepository,
        @inject('ProductsUserRepository')
        private productsUserRepository: IProductsUserRepository,
        @inject('ProductsUserNotificationsRepository')
        private productsUserNotificationsRepository: IProductsUserNotificationsRepository,
        @inject('SelectedProductsUserNotificationsRepository')
        private selectedProductsUserNotificationsRepository: ISelectedProductsUserNotificationsRepository
    ) { }

    public async show(user_id: string): Promise<object[]> {
        const productUser = await this.productsUserRepository.findByUser(user_id, [
            'product', 'product.user'
        ]);

        if (!productUser.length) {
            return [];
        }

        const products = productUser.map(product => product.product_id);
        const productTags = await this.productsTagsRepository.findByProductIds(products);
        const productsUserNotifications = await this.productsUserNotificationsRepository.countNotReadNotificationsByUser(user_id);
        const selectedProductsUserNotifications = await this.selectedProductsUserNotificationsRepository.findAlls(user_id, products);

        const responseProductUser = productUser.map(product => {
            return {
                id: product.id,
                product_id: product.product_id,
                product: {
                    title: product.product.title,
                    subtitle: product.product.subtitle,
                    nfc_id: product.product.nfc_id,
                    validate: product.product.validate,
                    avatar_url: product.product.getAvatarUrl(),
                    background_url: product.product.getBackgroundUrl(),
                    description: product.product.description,
                    user: {
                        nickname: product.product.user.nickname,
                        avatar_url: product.product.user.getAvatarUrl()
                    }
                },
                tag: productTags.filter(tag => tag.product_id === product.product_id),
                content: productsUserNotifications,
                notification: selectedProductsUserNotifications.some(prd => prd.product_id === product.product_id)
            }
        });

        return responseProductUser;
    }
}

export default SelectProductUserServices;