import { inject, injectable } from 'tsyringe';
import ProductContentText from '../infra/typeorm/entities/ProductContentText';
import IProductsContentRepository from '../repositories/IProductsContentRepository';
import IProductsContentTextRepository from '../repositories/IProductsContentTextRepository';
import AppError from '@shared/errors/AppError';

interface IRequest {
    title: string;
    description: string;
    content_id: string;
}

@injectable()
class CreateProductContentTextServices {
    constructor(
        @inject('ProductsContentRepository')
        private productsContentRepository: IProductsContentRepository,
        @inject('ProductsContentTextRepository')
        private productsContentTextRepository: IProductsContentTextRepository
    ) { }

    public async execute({ title, description, content_id }: IRequest): Promise<ProductContentText> {
        const productContent = await this.productsContentRepository.findById(content_id);

        if (!productContent) {
            throw new AppError('Conteúdo não encontrado.')
        }

        const productContentText = await this.productsContentTextRepository.create({
            title,
            description,
            content_id
        });

        return productContentText;
    }
}

export default CreateProductContentTextServices;