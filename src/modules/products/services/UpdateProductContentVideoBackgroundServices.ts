import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import ProductContentVideo from '../infra/typeorm/entities/ProductContentVideo';
import IProductsContentVideoRepository from '../repositories/IProductsContentVideoRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { classToClass } from 'class-transformer';

interface IRequest {
    id: string;
    background: string;
}

@injectable()
class UpdateProductContentVideoBackgroundServices {
    constructor(
        @inject('ProductsContentVideoRepository')
        private productsContentVideoRepository: IProductsContentVideoRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    public async execute({ id, background }: IRequest): Promise<ProductContentVideo> {
        const productContentVideo = await this.productsContentVideoRepository.findById(id);

        if (!productContentVideo) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContentVideo.background) {
            await this.storageProvider.deleteFile(productContentVideo.background);
        }

        const fileName = await this.storageProvider.saveFile(background);

        productContentVideo.background = fileName;

        await this.productsContentVideoRepository.save(productContentVideo);

        return classToClass(productContentVideo);
    }
}

export default UpdateProductContentVideoBackgroundServices;