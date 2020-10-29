import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequestUpdateAvatarProduct {
    id: string;
    avatar: string;
    user_id: string;
}

@injectable()
class UpdateProductAvatarServices {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) { }

    public async execute({ id, avatar, user_id }: IRequestUpdateAvatarProduct): Promise<Product> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Produto não encontrado', 401);
        }

        if (product.user_id !== user_id) {
            throw new AppError('Produto não pertence ao usuário', 401);
        }

        if (product.avatar) {
            const productAvatarFilePath = path.join(uploadConfig.directory, product.avatar);
            const productAvatarFileExists = await fs.promises.stat(productAvatarFilePath);

            if (productAvatarFileExists) {
                await fs.promises.unlink(productAvatarFilePath);
            }
        }

        product.avatar = avatar;

        await this.productsRepository.save(product);

        return product;
    }
}

export default UpdateProductAvatarServices;