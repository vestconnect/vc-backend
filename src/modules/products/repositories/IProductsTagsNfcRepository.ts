import ProductTagNfc from "../infra/typeorm/entities/ProductTagNfc";
import ICreateProductTagNfcDTO from "../dtos/ICreateProductTagNfcDTO";

export default interface IProductsTagsNfcRepository {
  find(): Promise<ProductTagNfc[]>;
  findActiveTags(): Promise<ProductTagNfc[]>;
  findByTag(tag: string): Promise<ProductTagNfc | undefined>;
  findByProductId(product_id: string): Promise<ProductTagNfc[]>;
  create(dto: ICreateProductTagNfcDTO): Promise<ProductTagNfc>;
  save(productTagNfc: ProductTagNfc): Promise<ProductTagNfc>;
  inactiveTag(id: string): Promise<void>;
  inactiveAll(): Promise<ProductTagNfc[]>;
  deleteByProductId(product_id: string): Promise<void>;
}
