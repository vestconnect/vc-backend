import IProductsRepository from '../repositories/IProductsRepository';
import IProductsTagsNfcRepository from '../repositories/IProductsTagsNfcRepository';
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
        private productsRepository: IProductsRepository,
        @inject('ProductsTagsNfcRepository')
        private productsTagsNfcRepository: IProductsTagsNfcRepository
    ) { }

    public async execute(dataProduct: IRequest): Promise<Product> {
        let checkProductNfcExists = await this.productsRepository.findByNfc(dataProduct.nfc_id);

        if (!checkProductNfcExists) {
            let productNfc = await this.productsTagsNfcRepository.findByTag(dataProduct.nfc_id);

            if (!productNfc) {
                throw new AppError('Produto não encontrado', 400);
            }

            checkProductNfcExists = await this.productsRepository.findById(productNfc.product_id);

            if (!checkProductNfcExists) {
                throw new AppError('Produto não encontrado', 400);
            }
        }

        return classToClass(checkProductNfcExists);
    }
}

export default CheckExistsProduct;