import { inject, injectable } from 'tsyringe';
import ProductContentPhoto from '../infra/typeorm/entities/ProductContentPhoto';
import IProductsContentRepository from '../repositories/IProductsContentRepository';
import IProductsContentPhotoRepository from '../repositories/IProductsContentPhotoRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    title: string;
    description: string;
    content_id: string;
}

@injectable()
class CreateProductContentPhotoServices {
    constructor(
        @inject('ProductsContentRepository')
        private productsContentRepository: IProductsContentRepository,
        @inject('ProductsContentPhotoRepository')
        private productsContentPhotoRepository: IProductsContentPhotoRepository
    ) { }

    public async execute({ title, description, content_id }: IRequest): Promise<ProductContentPhoto> {
        const productContent = await this.productsContentRepository.findById(content_id);

        if (!productContent) {
            throw new AppError('Conteúdo não encontrado.')
        }

        const productContentPhoto = await this.productsContentPhotoRepository.create({
            title,
            description,
            content_id
        });

        return productContentPhoto;
    }
}

export default CreateProductContentPhotoServices;