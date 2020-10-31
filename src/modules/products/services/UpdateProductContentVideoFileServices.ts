import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ProductContentVideo from '../infra/typeorm/entities/ProductContentVideo';
import IProductsContentVideoRepository from '../repositories/IProductsContentVideoRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
    id: string;
    file: string;
}

@injectable()
class UpdateProductContentVideoFileServices {
    constructor(
        @inject('ProductsContentVideoRepository')
        private productsContentVideoRepository: IProductsContentVideoRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    public async execute({ id, file }: IRequest): Promise<ProductContentVideo> {
        const productContentVideo = await this.productsContentVideoRepository.findById(id);

        if (!productContentVideo) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContentVideo.file) {
            await this.storageProvider.deleteFile(productContentVideo.file);
        }

        const fileName = await this.storageProvider.saveFile(file);

        productContentVideo.file = fileName;

        await this.productsContentVideoRepository.save(productContentVideo);

        return classToClass(productContentVideo);
    }
}

export default UpdateProductContentVideoFileServices;