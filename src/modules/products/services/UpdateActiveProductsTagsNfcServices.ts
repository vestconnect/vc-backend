import { inject, injectable } from 'tsyringe';
import IProductsTagsNfcRepository from '../repositories/IProductsTagsNfcRepository';
import ProductTagNfc from '../infra/typeorm/entities/ProductTagNfc';

@injectable()
class UpdateActiveProductsTagsNfcServices {
    constructor(
        @inject('ProductsTagsNfcRepository')
        private productsTagsNfcRepository: IProductsTagsNfcRepository
    ) { }

    public async execute(id: string): Promise<ProductTagNfc | ProductTagNfc[]> {
        let productTag;

        if (id) {
            productTag = await this.productsTagsNfcRepository.inactiveTag(id);

            return productTag;
        }

        productTag = await this.productsTagsNfcRepository.inactiveAll();

        return productTag;
    }
}

export default UpdateActiveProductsTagsNfcServices;