import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

interface IRequest {
    nfc_id: string;
    user_id: string;
    title: string;
    subtitle: string;
    validate: Date;
    description: string;
}

@injectable()
class CreateProductServices {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) { }

    public async execute(dataProduct: IRequest): Promise<Product> {
        const checkProductNfcExists = await this.productsRepository.findByNfc(dataProduct.nfc_id);

        if (checkProductNfcExists) {
            throw new AppError('NFC já cadastrado!', 401);
        }

        const product = await this.productsRepository.create(dataProduct);

        return product;
    }
}

export default CreateProductServices;