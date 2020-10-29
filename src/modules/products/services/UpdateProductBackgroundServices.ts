import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { injectable, inject } from 'tsyringe';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';

interface IRequestUpdateBackgroundProduct {
    id: string;
    background: string;
    user_id: string;
}

@injectable()
class UpdateProductBackgroundServices {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) { }

    public async execute({ id, background, user_id }: IRequestUpdateBackgroundProduct): Promise<Product> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Produto não encontrado', 401);
        }

        if (product.user_id !== user_id) {
            throw new AppError('Produto não pertence ao usuário', 401);
        }

        if (product.background) {
            const productBackgroundFilePath = path.join(uploadConfig.directory, product.background);
            const productBackgroundFileExists = await fs.promises.stat(productBackgroundFilePath);

            if (productBackgroundFileExists) {
                await fs.promises.unlink(productBackgroundFilePath);
            }
        }

        product.background = background;

        await this.productsRepository.save(product);

        return product;
    }
}

export default UpdateProductBackgroundServices;