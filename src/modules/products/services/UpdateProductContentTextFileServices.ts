import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import ProductContentText from '../infra/typeorm/entities/ProductContentText';
import IProductsContentTextRepository from '../repositories/IProductsContentTextRepository';

interface IRequest {
    id: string;
    file: string;
}

@injectable()
class UpdateProductContentTextFileServices {
    constructor(
        @inject('ProductsContentTextRepository')
        private productsContentTextRepository: IProductsContentTextRepository
    ) { }

    public async execute({ id, file }: IRequest): Promise<ProductContentText> {
        const productContentText = await this.productsContentTextRepository.findById(id);

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

        await this.productsContentTextRepository.save(productContentText);

        return productContentText;
    }
}

export default UpdateProductContentTextFileServices;