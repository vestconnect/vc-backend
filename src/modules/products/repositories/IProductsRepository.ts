import Product from "../infra/typeorm/entities/Product";
import ICreateProductDTO from "../dtos/ICreateProductDTO";

export default interface IProductsRepository {
  count(): Promise<number>;
  findById(id: string): Promise<Product | undefined>;
  findByNfc(nfc_id: string): Promise<Product | undefined>;
  create(data: ICreateProductDTO): Promise<Product>;
  save(product: Product): Promise<Product>;
  delete(id: string): Promise<void>;
}
