import { inject, injectable } from 'tsyringe';
import IProductsTagsRepository from '../repositories/IProductsTagsRepository'
import IProductsRepository from '../repositories/IProductsRepository';
import ProductTag from '../infra/typeorm/entities/ProductTag';
import AppError from '@shared/errors/AppError';

interface IRequest {
    product_id: string;
    description: string;
}

@injectable()
class CreateProductTagServices {
    constructor(
        @inject('ProductsTagsRepository')
        private productsTagsRepository: IProductsTagsRepository,
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) { }

    public async create({ product_id, description }: IRequest): Promise<ProductTag> {
        const product = await this.productsRepository.findById(product_id);

        if (!product) {
            throw new AppError('Produto não encontrado.', 401);
        }

        const count = await this.productsTagsRepository.countByProduct(product_id);

        if (count >= 3) {
            throw new AppError('Só é possível inserir apenas 3 TAGS', 401);
        }

        const productTag = await this.productsTagsRepository.create({
            description,
            product_id
        });

        return productTag;
    }
}

export default CreateProductTagServices;