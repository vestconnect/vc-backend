import { inject, injectable } from 'tsyringe';
import IProductsTagsNfcRepository from '../repositories/IProductsTagsNfcRepository';
import ProductTagNfc from '../infra/typeorm/entities/ProductTagNfc';

@injectable()
class SelectProductTagNfcServices {
    constructor(
        @inject('ProductsTagsNfcRepository')
        private productsTagsNfcRepository: IProductsTagsNfcRepository
    ) { }

    public async execute(product_id: string): Promise<ProductTagNfc[]> {
        const productTag = await this.productsTagsNfcRepository.findByProductId(product_id);


        return productTag;
    }
}

export default SelectProductTagNfcServices;