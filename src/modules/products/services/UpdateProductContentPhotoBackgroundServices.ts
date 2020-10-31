import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ProductContentPhoto from '../infra/typeorm/entities/ProductContentPhoto';
import IProductsContentPhotoRepository from '../repositories/IProductsContentPhotoRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
    id: string;
    background: string;
}

@injectable()
class UpdateProductContentPhotoBackgroundServices {
    constructor(
        @inject('ProductsContentPhotoRepository')
        private productsContentPhotoRepository: IProductsContentPhotoRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    public async execute({ id, background }: IRequest): Promise<ProductContentPhoto> {
        const productContentPhoto = await this.productsContentPhotoRepository.findById(id);

        if (!productContentPhoto) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContentPhoto.background) {
            await this.storageProvider.deleteFile(productContentPhoto.background);
        }

        const fileName = await this.storageProvider.saveFile(background);

        productContentPhoto.background = background;

        await this.productsContentPhotoRepository.save(productContentPhoto);

        return classToClass(productContentPhoto);
    }
}

export default UpdateProductContentPhotoBackgroundServices;