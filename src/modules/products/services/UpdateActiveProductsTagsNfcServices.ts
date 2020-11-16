import { inject, injectable } from 'tsyringe';
import IProductsTagsNfcRepository from '../repositories/IProductsTagsNfcRepository';
import ProductTagNfc from '../infra/typeorm/entities/ProductTagNfc';

@injectable()
class UpdateActiveProductsTagsNfcServices {
    constructor(
        @inject('ProductsTagsNfcRepository')
        private productsTagsNfcRepository: IProductsTagsNfcRepository
    ) { }

    public async execute(id: string): Promise<void> {
        if (id) {
            await this.productsTagsNfcRepository.inactiveTag(id);

            return;
        }

        await this.productsTagsNfcRepository.inactiveAll();
    }
}

export default UpdateActiveProductsTagsNfcServices;