import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import ProductContent from '@modules/products/infra/typeorm/entities/ProductContent';
import IProductsContentRepository from '../repositories/IProductsContentRepository';

interface RequestUpdateBackgroundProductContent {
    id: string;
    background: string;
    user_id: string;
}

@injectable()
class ProductContentServices {
    constructor(
        @inject('ProductsContentRepository')
        private productsContentRepository: IProductsContentRepository
    ) { }

    public async update({ id, background, user_id }: RequestUpdateBackgroundProductContent): Promise<ProductContent> {
        const productContent = await this.productsContentRepository.findById(id);

        if (!productContent) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContent.product.user_id !== user_id) {
            throw new AppError('Conteúdo não pertence ao usuário', 401);
        }

        if (productContent.background) {
            const productBackgroundFilePath = path.join(uploadConfig.directory, productContent.background);
            const productBackgroundFileExists = await fs.promises.stat(productBackgroundFilePath);

            if (productBackgroundFileExists) {
                await fs.promises.unlink(productBackgroundFilePath);
            }
        }

        productContent.background = background;

        await this.productsContentRepository.save(productContent);

        return productContent;
    }
}

export default ProductContentServices;