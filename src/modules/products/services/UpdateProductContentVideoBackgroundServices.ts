import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import ProductContentVideo from '../infra/typeorm/entities/ProductContentVideo';
import IProductsContentVideoRepository from '../repositories/IProductsContentVideoRepository';

interface IRequest {
    id: string;
    background: string;
}

@injectable()
class UpdateProductContentVideoBackgroundServices {
    constructor(
        @inject('ProductsContentVideoRepository')
        private productsContentVideoRepository: IProductsContentVideoRepository
    ) { }

    public async execute({ id, background }: IRequest): Promise<ProductContentVideo> {
        const productContentVideo = await this.productsContentVideoRepository.findById(id);

        if (!productContentVideo) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContentVideo.background) {
            const productContentVideoBackgroundFilePath = path.join(uploadConfig.directory, productContentVideo.background);
            const productContentVideoBackgroundFileExists = await fs.promises.stat(productContentVideoBackgroundFilePath);

            if (productContentVideoBackgroundFileExists) {
                await fs.promises.unlink(productContentVideoBackgroundFilePath);
            }
        }

        productContentVideo.background = background;

        await this.productsContentVideoRepository.save(productContentVideo);

        return productContentVideo;
    }
}

export default UpdateProductContentVideoBackgroundServices;