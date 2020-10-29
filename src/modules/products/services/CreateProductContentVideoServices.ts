import { inject, injectable } from 'tsyringe';
import ProductContentVideo from '../infra/typeorm/entities/ProductContentVideo';
import IProductsContentRepository from '../repositories/IProductsContentRepository';
import IProductsContentVideoRepository from '../repositories/IProductsContentVideoRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    title: string;
    description: string;
    content_id: string;
}

@injectable()
class CreateProductContentVideoServices {
    constructor(
        @inject('ProductsContentRepository')
        private productsContentRepository: IProductsContentRepository,
        @inject('ProductsContentVideoRepository')
        private productsContentVideoRepository: IProductsContentVideoRepository
    ) { }

    public async execute({ title, description, content_id }: IRequest): Promise<ProductContentVideo> {
        const productContent = await this.productsContentRepository.findById(content_id);

        if (!productContent) {
            throw new AppError('Conteúdo não encontrado.')
        }

        const productContentVideo = await this.productsContentVideoRepository.create({
            title,
            description,
            content_id
        });

        return productContentVideo;
    }
}

export default CreateProductContentVideoServices;