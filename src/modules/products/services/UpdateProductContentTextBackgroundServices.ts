import { injectable, inject } from 'tsyringe';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import uploadConfig from '@config/upload';
import ProductContentText from '../infra/typeorm/entities/ProductContentText';
import IProductsContentTextRepository from '../repositories/IProductsContentTextRepository';

interface IRequest {
    id: string;
    background: string;
}

@injectable()
class UpdateProductContentTextBackgroundServices {
    constructor(
        @inject('ProductsContentTextRepository')
        private productsContentTextRepository: IProductsContentTextRepository
    ) { }

    public async execute({ id, background }: IRequest): Promise<ProductContentText> {
        const productContentText = await this.productsContentTextRepository.findById(id);

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

        await this.productsContentTextRepository.save(productContentText);

        return productContentText;
    }
}

export default UpdateProductContentTextBackgroundServices;