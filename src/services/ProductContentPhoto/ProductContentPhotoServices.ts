import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import uploadConfig from '../../config/upload';
import ProductContentPhoto from '../../models/ProductContentPhoto';

interface RequestBackground {
    id: string;
    background: string;
}

interface RequestFile {
    id: string;
    file: string;
}

class ProductContentPhotoServices {
    public async updateBackground({ id, background }: RequestBackground): Promise<ProductContentPhoto> {
        const productContentPhotoRepository = getRepository(ProductContentPhoto);

        const productContentPhoto = await productContentPhotoRepository.findOne({
            where: { id }
        });

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

        await productContentPhotoRepository.save(productContentPhoto);

        return productContentPhoto;
    }

    public async updateFile({ id, file }: RequestFile): Promise<ProductContentPhoto> {
        const productContentPhotoRepository = getRepository(ProductContentPhoto);

        const productContentPhoto = await productContentPhotoRepository.findOne({
            where: { id }
        });

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

        await productContentPhotoRepository.save(productContentPhoto);

        return productContentPhoto;
    }
}

export default ProductContentPhotoServices;