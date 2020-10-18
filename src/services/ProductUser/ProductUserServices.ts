import { getRepository, In } from 'typeorm';
import AppError from '../../errors/AppError';
import ProductUser from '../../models/ProductUser';
import Product from '../../models/Product';
import ProductTag from '../../models/ProductTag';
import ProductUserNotification from '../../models/ProductUserNotification';
import SelectedProductUserNotification from '../../models/SelectedProductUserNotification';

interface Request {
    nfc_id: string;
    user_id: string;
}

class ProductUserServices {
    public async execute({ nfc_id, user_id }: Request): Promise<object> {
        const productUserRepository = getRepository(ProductUser);
        const productRepository = getRepository(Product);
        const productTagRepository = getRepository(ProductTag);
        const productUserNotificationRepository = getRepository(ProductUserNotification);
        const selectedProductUserNotificationRepository = getRepository(SelectedProductUserNotification);

        const product = await productRepository.findOne({
            where: { nfc_id }
        });

        if (!product) {
            throw new AppError('Produto não encontrado', 401);
        }

        const existsProduct = await productUserRepository.findOne({
            where: { product_id: product.id }
        });

        if (existsProduct) {
            throw new AppError('Produto já inserido', 401);
        }

        const productUser = productUserRepository.create({
            product_id: product.id,
            user_id
        });

        await productUserRepository.save(productUser);

        const productUserReturn = await productUserRepository.findOne({
            where: { id: productUser.id },
            relations: ['product', 'product.user']
        });

        const productTags = await productTagRepository.find({
            where: { product_id: productUser.id }
        });

        const productUserNotification = await productUserNotificationRepository.count({
            where: { read: false, user_id, product_id: productUser.id }
        });

        const productNotification = await selectedProductUserNotificationRepository.find({
            where: {
                product_id: productUser.id,
                user_id
            }
        });

        const responseProductUser = {
            id: product.id,
            product_id: productUserReturn?.product_id,
            product: {
                title: productUserReturn?.product.title,
                subtitle: productUserReturn?.product.subtitle,
                nfc_id: productUserReturn?.product.nfc_id,
                validate: productUserReturn?.product.validate,
                avatar: productUserReturn?.product.avatar,
                background: productUserReturn?.product.background,
                description: productUserReturn?.product.description,
                user: {
                    nickname: productUserReturn?.product.user.nickname,
                    avatar: productUserReturn?.product.user.avatar
                }
            },
            tag: productTags.filter(tag => tag.product_id === productUser.id),
            content: productUserNotification,
            notification: productNotification.some(prd => prd.product_id === productUser.id)
        }

        return responseProductUser;
    }
}

export default ProductUserServices;