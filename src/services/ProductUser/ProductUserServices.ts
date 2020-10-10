import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import ProductUser from '../../models/ProductUser';
import Product from '../../models/Product';

interface Request {
    nfc_id: string;
    user_id: string;
}

class ProductUserServices {
    public async execute({ nfc_id, user_id }: Request): Promise<ProductUser> {
        const productUserRepository = getRepository(ProductUser);
        const productRepository = getRepository(Product);

        const product = await productRepository.findOne({
            where: { nfc_id }
        });

        if (!product) {
            throw new AppError('Produto não encontrado', 401);
        }

        const productUser = productUserRepository.create({
            product_id: product.id,
            user_id
        });

        await productUserRepository.save(productUser);

        return productUser;
    }
}

export default ProductUserServices;