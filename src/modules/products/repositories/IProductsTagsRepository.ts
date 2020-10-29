import ProductTag from '../infra/typeorm/entities/ProductTag';
import ICreateProductTag from '../dtos/ICreateProdutTagDTO';

export default interface IProductsTagsRepository {
    findById(id: string): Promise<ProductTag | undefined>;
    findByProduct(product_id: string): Promise<ProductTag[]>;
    findByProductIds(product_id: string[]): Promise<ProductTag[]>;
    create(dto: ICreateProductTag): Promise<ProductTag>;
    save(productTag: ProductTag): Promise<ProductTag>;
}