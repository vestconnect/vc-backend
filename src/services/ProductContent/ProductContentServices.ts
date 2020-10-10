import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import uploadConfig from '../../config/upload';
import ProductContent from '../../models/ProductContent';

interface RequestUpdateBackgroundProductContent {
    id: string;
    background: string;
    user_id: string;
}

class ProductContentServices {
    public async updateBackground({ id, background, user_id }: RequestUpdateBackgroundProductContent): Promise<ProductContent> {
        const productsContentRepository = getRepository(ProductContent);

        const productContent = await productsContentRepository.findOne({
            where: { id },
            relations: ['product']
        });

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

        await productsContentRepository.save(productContent);

        return productContent;
    }
}

export default ProductContentServices;