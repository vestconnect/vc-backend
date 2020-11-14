import { Repository, getRepository } from 'typeorm';
import ProductTagNfc from '../entities/ProductTagNfc';
import ICreateProductTagNfcDTO from '@modules/products/dtos/ICreateProductTagNfcDTO';
import IProductsTagsNfcRepository from '@modules/products/repositories/IProductsTagsNfcRepository';
import AppError from '@shared/errors/AppError';

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

    public async inactiveTag(id: string): Promise<ProductTagNfc> {
        const productTagNfc = await this.ormRepository.findOne(id);

        if (!productTagNfc) {
            throw new AppError('Tag não encontrada', 400);
        }

        productTagNfc.active = false;

        await this.ormRepository.save(productTagNfc);

        return productTagNfc;
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