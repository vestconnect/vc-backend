import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import ProductContent from '@modules/products/infra/typeorm/entities/ProductContent';
import IProductsContentRepository from '../repositories/IProductsContentRepository';
import { classToClass } from 'class-transformer';

interface RequestUpdateBackgroundProductContent {
    id: string;
    background: string;
    user_id: string;
}

@injectable()
class ProductContentServices {
    constructor(
        @inject('ProductsContentRepository')
        private productsContentRepository: IProductsContentRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
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
            await this.storageProvider.deleteFile(productContent.background);
        }

        const fileName = await this.storageProvider.saveFile(background);

        productContent.background = fileName;

        await this.productsContentRepository.save(productContent);

        return classToClass(productContent);
    }
}

export default ProductContentServices;