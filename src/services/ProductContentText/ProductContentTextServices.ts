import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import uploadConfig from '../../config/upload';
import ProductContentText from '../../models/ProductContentText';

interface RequestBackground {
    id: string;
    background: string;
}

interface RequestFile {
    id: string;
    file: string;
}

class ProductContentTextServices {
    public async updateBackground({ id, background }: RequestBackground): Promise<ProductContentText> {
        const productContentTextRepository = getRepository(ProductContentText);

        const productContentText = await productContentTextRepository.findOne({
            where: { id }
        });

        if (!productContentText) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContentText.background) {
            const productContentTextBackgroundFilePath = path.join(uploadConfig.directory, productContentText.background);
            const productContentTextBackgroundFileExists = await fs.promises.stat(productContentTextBackgroundFilePath);

            if (productContentTextBackgroundFileExists) {
                await fs.promises.unlink(productContentTextBackgroundFilePath);
            }
        }

        productContentText.background = background;

        await productContentTextRepository.save(productContentText);

        return productContentText;
    }

    public async updateFile({ id, file }: RequestFile): Promise<ProductContentText> {
        const productContentTextRepository = getRepository(ProductContentText);

        const productContentText = await productContentTextRepository.findOne({
            where: { id }
        });

        if (!productContentText) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContentText.file) {
            const productContentTextFileFilePath = path.join(uploadConfig.directory, productContentText.file);
            const productContentTextFileFileExists = await fs.promises.stat(productContentTextFileFilePath);

            if (productContentTextFileFileExists) {
                await fs.promises.unlink(productContentTextFileFilePath);
            }
        }

        productContentText.file = file;

        await productContentTextRepository.save(productContentText);

        return productContentText;
    }
}

export default ProductContentTextServices;