import { Repository, getRepository, In } from 'typeorm';
import IProductsTagsRepository from '@modules/products/repositories/IProductsTagsRepository';
import ICreateProductTagDTO from '@modules/products/dtos/ICreateProdutTagDTO';
import ProductTag from '../entities/ProductTag';

class ProductsTagsRepository implements IProductsTagsRepository {
    private ormRepository: Repository<ProductTag>;

    constructor() {
        this.ormRepository = getRepository(ProductTag);
    }

    public async findById(id: string): Promise<ProductTag | undefined> {
        const productTag = await this.ormRepository.findOne(id);

        return productTag;
    }

    public async findByProduct(product_id: string): Promise<ProductTag[]> {
        const productTag = await this.ormRepository.find({
            where: {
                product_id
            }
        });

        return productTag;
    }

    public async findByProductIds(products: string[]): Promise<ProductTag[]> {
        const productTag = await this.ormRepository.find({
            where: { product_id: In(products) }
        });

        return productTag;
    }

    public async create(dto: ICreateProductTagDTO): Promise<ProductTag> {
        const productTag = this.ormRepository.create(dto);

        await this.ormRepository.save(productTag);

        return productTag;
    }

    public async save(productTag: ProductTag): Promise<ProductTag> {
        return await this.ormRepository.save(productTag);
    }
}

export default ProductsTagsRepository;