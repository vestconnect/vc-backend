import IProductsRepository from '../repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import { classToClass } from 'class-transformer';

interface IRequest {
    nfc_id: string;
}

@injectable()
class CheckExistsProduct {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) { }

    public async execute(dataProduct: IRequest): Promise<Product> {
        const checkProductNfcExists = await this.productsRepository.findByNfc(dataProduct.nfc_id);

        if (!checkProductNfcExists) {
            throw new AppError('Produto não encontrado');
        }

        return classToClass(checkProductNfcExists);
    }
}

export default CheckExistsProduct;