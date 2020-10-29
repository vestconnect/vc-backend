import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import ProductContentVideo from '../infra/typeorm/entities/ProductContentVideo';
import IProductsContentVideoRepository from '../repositories/IProductsContentVideoRepository';

interface IRequest {
    id: string;
    file: string;
}

@injectable()
class UpdateProductContentVideoFileServices {
    constructor(
        @inject('ProductsContentVideoRepository')
        private productsContentVideoRepository: IProductsContentVideoRepository
    ) { }

    public async execute({ id, file }: IRequest): Promise<ProductContentVideo> {
        const productContentVideo = await this.productsContentVideoRepository.findById(id);

        if (!productContentVideo) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContentVideo.file) {
            const productContentVideoFileFilePath = path.join(uploadConfig.directory, productContentVideo.file);
            const productContentVideoFileFileExists = await fs.promises.stat(productContentVideoFileFilePath);

            if (productContentVideoFileFileExists) {
                await fs.promises.unlink(productContentVideoFileFilePath);
            }
        }

        productContentVideo.file = file;

        await this.productsContentVideoRepository.save(productContentVideo);

        return productContentVideo;
    }
}

export default UpdateProductContentVideoFileServices;