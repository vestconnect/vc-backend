import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ProductContentPhoto from '../infra/typeorm/entities/ProductContentPhoto';
import IProductsContentPhotoRepository from '../repositories/IProductsContentPhotoRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
    id: string;
    file: string;
}

@injectable()
class UpdateProductContentPhotoFileServices {
    constructor(
        @inject('ProductsContentPhotoRepository')
        private productsContentPhotoRepository: IProductsContentPhotoRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    public async execute({ id, file }: IRequest): Promise<ProductContentPhoto> {
        const productContentPhoto = await this.productsContentPhotoRepository.findById(id);

        if (!productContentPhoto) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContentPhoto.file) {
            await this.storageProvider.deleteFile(productContentPhoto.file);
        }

        const fileName = await this.storageProvider.saveFile(file);

        productContentPhoto.file = fileName;

        await this.productsContentPhotoRepository.save(productContentPhoto);

        return classToClass(productContentPhoto);
    }
}

export default UpdateProductContentPhotoFileServices;