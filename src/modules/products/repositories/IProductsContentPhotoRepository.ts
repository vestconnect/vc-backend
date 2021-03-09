import ProductContentPhoto from "../infra/typeorm/entities/ProductContentPhoto";
import ICreateProductContentPhotoDTO from "../dtos/ICreateProductContentPhotoDTO";

export default interface IProductsContentPhotoRepository {
  count(): Promise<number>;
  findById(id: string): Promise<ProductContentPhoto | undefined>;
  create(data: ICreateProductContentPhotoDTO): Promise<ProductContentPhoto>;
  save(productContentPhoto: ProductContentPhoto): Promise<ProductContentPhoto>;
  delete(id: string): Promise<void>;
  deleteByContentId(content_id: string): Promise<void>;
}
