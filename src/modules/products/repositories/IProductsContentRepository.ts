import ProductContent from "../infra/typeorm/entities/ProductContent";
import ICreateProductContentDTO from "../dtos/ICreateProductContentDTO";
import IFindProductContentByType from "../dtos/IFindProductContentByType";

export default interface IProductsContentRepository {
  findById(id: string): Promise<ProductContent | undefined>;
  findContentByType(data: IFindProductContentByType): Promise<ProductContent[]>;
  findByProductId(product_id: string): Promise<ProductContent[]>;
  create(data: ICreateProductContentDTO): Promise<ProductContent>;
  save(productContent: ProductContent): Promise<ProductContent>;
  delete(id: string): Promise<void>;
  deleteByProductId(product_id: string): Promise<void>;
}
