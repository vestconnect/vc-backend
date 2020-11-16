import { Repository, getRepository } from 'typeorm';
import ProductTagNfc from '../entities/ProductTagNfc';
import ICreateProductTagNfcDTO from '@modules/products/dtos/ICreateProductTagNfcDTO';
import IProductsTagsNfcRepository from '@modules/products/repositories/IProductsTagsNfcRepository';
import isUUID from 'is-uuid';

class ProductsTagsNfcRepository implements IProductsTagsNfcRepository {
    private ormRepository: Repository<ProductTagNfc>;

    constructor() {
        this.ormRepository = getRepository(ProductTagNfc);
    }

    public async find(): Promise<ProductTagNfc[]> {
        const productsTag = await this.ormRepository.find();

        return productsTag;
    }

    public async findActiveTags(): Promise<ProductTagNfc[]> {
        const productsTag = await this.ormRepository.find({
            where: { active: true }
        });

        return productsTag;
    }

    public async findByTag(tag_nfc: string): Promise<ProductTagNfc | undefined> {
        const productsTag = await this.ormRepository.findOne({
            where: { tag_nfc }
        });

        return productsTag;
    }

    public async findByProductId(product_id: string): Promise<ProductTagNfc[]> {
        const productsTag = await this.ormRepository.find({
            where: { product_id }
        });

        return productsTag;
    }

    public async create(dto: ICreateProductTagNfcDTO): Promise<ProductTagNfc> {
        const productTagNfc = this.ormRepository.create(dto);

        await this.ormRepository.save(productTagNfc);

        return productTagNfc;
    }

    public async save(productTagNfc: ProductTagNfc): Promise<ProductTagNfc> {
        return await this.ormRepository.save(productTagNfc);
    }

    public async inactiveTag(id: string): Promise<void> {
        let productTagNfc;

        if (isUUID.anyNonNil(id)) {
            productTagNfc = await this.ormRepository.findOne({
                where: { id }
            });
        }

        if (!productTagNfc) {
            productTagNfc = await this.ormRepository.findOne({
                where: { tag_nfc: id }
            });

            if (!productTagNfc) return;
        }

        productTagNfc.active = false;

        await this.ormRepository.save(productTagNfc);
    }

    public async inactiveAll(): Promise<ProductTagNfc[]> {
        const productTagNfc = await this.ormRepository.find();

        productTagNfc.forEach(tag => {
            tag.active = false;
        });

        await this.ormRepository.save(productTagNfc);

        return productTagNfc;
    }
}

export default ProductsTagsNfcRepository;