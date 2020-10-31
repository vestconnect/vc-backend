import IProductsRepository from '../repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';

interface IRequest {
    nfc_id: string;
}

@injectable()
class CheckExistsProduct {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository
    ) { }

    public async execute(dataProduct: IRequest): Promise<boolean> {
        const checkProductNfcExists = await this.productsRepository.findByNfc(dataProduct.nfc_id);

        return !!checkProductNfcExists;
    }
}

export default CheckExistsProduct;