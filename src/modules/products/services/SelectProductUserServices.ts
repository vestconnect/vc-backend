import { inject, injectable } from 'tsyringe';
import IProductsUserRepository from '@modules/products/repositories/IProductsUserRepository';
import IProductsTagsRepository from '@modules/products/repositories/IProductsTagsRepository';
import ISelectedProductsUserNotificationsRepository from '@modules/products/repositories/ISelectedProductsUserNotificationsRepository';
import IProductsUserNotificationsRepository from '@modules/products/repositories/IProductsUserNotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import ProductTag from '../infra/typeorm/entities/ProductTag';

interface IResponse {
    id: string;
    product_id: string;
    product: {
        title: string;
        subtitle: string;
        nfc_id: string;
        validate: Date;
        avatar_url: string;
        background_url: string;
        description: string;
        active: boolean;
        user: {
            nickname: string;
            avatar_url: string;
        }
    },
    tag: ProductTag[];
    content: number;
    notification: boolean;
}

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
        private selectedProductsUserNotificationsRepository: ISelectedProductsUserNotificationsRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) { }

    public async execute(user_id: string): Promise<object[]> {
        await this.cacheProvider.invalidate(`productuser-list:${user_id}`);
        let responseProductUser = await this.cacheProvider.recover<IResponse[]>(`productuser-list:${user_id}`);

        if (!responseProductUser?.length) {
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

            responseProductUser = productUser.map(product => {
                if (product.product.active) {
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
                            active: product.product.active,
                            user: {
                                nickname: product.product.user.nickname,
                                avatar_url: product.product.user.getAvatarUrl()
                            }
                        },
                        tag: productTags.filter(tag => tag.product_id === product.product_id),
                        content: productsUserNotifications,
                        notification: selectedProductsUserNotifications.some(prd => prd.product_id === product.product_id)
                    } as IResponse;
                }

                return {} as IResponse;
            });

            responseProductUser = responseProductUser.filter(value => Object.keys(value).length !== 0);

            await this.cacheProvider.save(`productuser-list:${user_id}`, responseProductUser);
        }

        return responseProductUser;
    }
}

export default SelectProductUserServices;