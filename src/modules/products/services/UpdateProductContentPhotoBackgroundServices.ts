import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import ProductContentPhoto from '../infra/typeorm/entities/ProductContentPhoto';
import IProductsContentPhotoRepository from '../repositories/IProductsContentPhotoRepository';

interface IRequest {
    id: string;
    background: string;
}

@injectable()
class UpdateProductContentPhotoBackgroundServices {
    constructor(
        @inject('ProductsContentPhotoRepository')
        private productsContentPhotoRepository: IProductsContentPhotoRepository
    ) { }

    public async execute({ id, background }: IRequest): Promise<ProductContentPhoto> {
        const productContentPhoto = await this.productsContentPhotoRepository.findById(id);

        if (!productContentPhoto) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContentPhoto.background) {
            const productContentPhotoBackgroundFilePath = path.join(uploadConfig.directory, productContentPhoto.background);
            const productContentPhotoBackgroundFileExists = await fs.promises.stat(productContentPhotoBackgroundFilePath);

            if (productContentPhotoBackgroundFileExists) {
                await fs.promises.unlink(productContentPhotoBackgroundFilePath);
            }
        }

        productContentPhoto.background = background;

        await this.productsContentPhotoRepository.save(productContentPhoto);

        return productContentPhoto;
    }
}

export default UpdateProductContentPhotoBackgroundServices;