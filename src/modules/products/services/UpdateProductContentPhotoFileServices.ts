import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import ProductContentPhoto from '../infra/typeorm/entities/ProductContentPhoto';
import IProductsContentPhotoRepository from '../repositories/IProductsContentPhotoRepository';

interface IRequest {
    id: string;
    file: string;
}

@injectable()
class UpdateProductContentPhotoFileServices {
    constructor(
        @inject('ProductsContentPhotoRepository')
        private productsContentPhotoRepository: IProductsContentPhotoRepository
    ) { }

    public async execute({ id, file }: IRequest): Promise<ProductContentPhoto> {
        const productContentPhoto = await this.productsContentPhotoRepository.findById(id);

        if (!productContentPhoto) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContentPhoto.file) {
            const productContentPhotoFileFilePath = path.join(uploadConfig.directory, productContentPhoto.file);
            const productContentPhotoFileFileExists = await fs.promises.stat(productContentPhotoFileFilePath);

            if (productContentPhotoFileFileExists) {
                await fs.promises.unlink(productContentPhotoFileFilePath);
            }
        }

        productContentPhoto.file = file;

        await this.productsContentPhotoRepository.save(productContentPhoto);

        return productContentPhoto;
    }
}

export default UpdateProductContentPhotoFileServices;