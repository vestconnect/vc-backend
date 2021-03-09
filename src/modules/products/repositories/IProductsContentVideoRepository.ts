import ProductContentVideo from "../infra/typeorm/entities/ProductContentVideo";
import ICreateProductContentVideoDTO from "../dtos/ICreateProductContentVideoDTO";

export default interface IProductsContentVideoRepository {
  count(): Promise<number>;
  findById(id: string): Promise<ProductContentVideo | undefined>;
  create(data: ICreateProductContentVideoDTO): Promise<ProductContentVideo>;
  save(productContentVideo: ProductContentVideo): Promise<ProductContentVideo>;
  deleteByContentId(content_id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
