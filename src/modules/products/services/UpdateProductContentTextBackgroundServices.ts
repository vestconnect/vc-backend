import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ProductContentText from '../infra/typeorm/entities/ProductContentText';
import IProductsContentTextRepository from '../repositories/IProductsContentTextRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
    id: string;
    background: string;
}

@injectable()
class UpdateProductContentTextBackgroundServices {
    constructor(
        @inject('ProductsContentTextRepository')
        private productsContentTextRepository: IProductsContentTextRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    public async execute({ id, background }: IRequest): Promise<ProductContentText> {
        const productContentText = await this.productsContentTextRepository.findById(id);

        if (!productContentText) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContentText.background) {
            await this.storageProvider.deleteFile(productContentText.background);
        }

        const fileName = await this.storageProvider.saveFile(background);

        productContentText.background = fileName;

        await this.productsContentTextRepository.save(productContentText);

        return classToClass(productContentText);
    }
}

export default UpdateProductContentTextBackgroundServices;