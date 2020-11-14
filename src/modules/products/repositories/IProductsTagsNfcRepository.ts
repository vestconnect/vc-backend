import ProductTagNfc from '../infra/typeorm/entities/ProductTagNfc';
import ICreateProductTagNfcDTO from '../dtos/ICreateProductTagNfcDTO';

export default interface IProductsTagsNfcRepository {
    find(): Promise<ProductTagNfc[]>;
    findActiveTags(): Promise<ProductTagNfc[]>;
    findByProductId(product_id: string): Promise<ProductTagNfc[]>;
    create(dto: ICreateProductTagNfcDTO): Promise<ProductTagNfc>;
    save(productTagNfc: ProductTagNfc): Promise<ProductTagNfc>;
    inactiveTag(id: string): Promise<ProductTagNfc>;
    inactiveAll(): Promise<ProductTagNfc[]>;
}