import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IProductsUserRepository from '@modules/products/repositories/IProductsUserRepository';
import IProductsTagsRepository from '@modules/products/repositories/IProductsTagsRepository';
import ISelectedProductsUserNotificationsRepository from '@modules/products/repositories/ISelectedProductsUserNotificationsRepository';
import IProductsUserNotificationsRepository from '@modules/products/repositories/IProductsUserNotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    nfc_id: string;
    user_id: string;
}

@injectable()
class CreateProductUserServices {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
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

    public async execute({ nfc_id, user_id }: IRequest): Promise<object> {
        const product = await this.productsRepository.findByNfc(nfc_id);

        if (!product) {
            throw new AppError('Produto não encontrado', 401);
        }

        const existsProduct = await this.productsUserRepository.findByProductId(product.id, user_id);

        if (existsProduct) {
            throw new AppError('Produto já inserido', 401);
        }

        const productUser = await this.productsUserRepository.create({
            product_id: product.id,
            user_id
        });

        if (!productUser) {
            throw new AppError('Erro ao inserir mercadoria', 401);
        }

        const productTags = await this.productsTagsRepository.findByProduct(product.id);

        const productUserNotification = await this.productsUserNotificationsRepository.countNotReadNotifications({
            product_id: product.id,
            user_id
        })

        const productNotification = await this.selectedProductsUserNotificationsRepository.findAll({
            product_id: product.id,
            user_id
        })

        const responseProductUser = {
            id: product.id,
            product_id: product.id,
            product: {
                title: product.title,
                subtitle: product.subtitle,
                nfc_id: product.nfc_id,
                validate: product.validate,
                avatar: product.avatar,
                background: product.background,
                description: product.description,
                user: {
                    nickname: productUser.product.user.nickname,
                    avatar: productUser.product.user.avatar
                }
            },
            tag: productTags,
            content: productUserNotification,
            notification: productNotification.length > 0 ? true : false
        }

        await this.cacheProvider.invalidate(`productuser-list:${user_id}`);

        return responseProductUser;
    }
}

export default CreateProductUserServices;