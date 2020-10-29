import ProductContent from '@modules/products/infra/typeorm/entities/ProductContent';
import IProductsContentRepository from '../repositories/IProductsContentRepository';
import IProductsRepository from '../repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

enum Type {
    Photos = "P",
    Videos = "V",
    Texts = "T"
}

interface IRequest {
    description: string;
    type: Type;
    product_id: string;
}

@injectable()
class CreateProductContentServices {
    constructor(
        @inject('ProductsContentRepository')
        private productsContentRepository: IProductsContentRepository,
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
    ) { }

    public async execute(dataProduct: IRequest): Promise<ProductContent> {
        const product = await this.productsRepository.findById(dataProduct.product_id);

        if (!product) {
            throw new AppError('Produto não cadastrado', 401);
        }

        const productContent = await this.productsContentRepository.create(dataProduct);

        return productContent;
    }
}

export default CreateProductContentServices;