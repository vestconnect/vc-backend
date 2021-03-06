import ProductUser from "../infra/typeorm/entities/ProductUser";
import ICreateProductUserDTO from "../dtos/ICreateProductUserDTO";

export default interface IProductsUserRepository {
  findById(id: string): Promise<ProductUser | undefined>;
  findByProductId(
    product_id: string,
    user_id: string
  ): Promise<ProductUser | undefined>;
  findUsersByProduct(
    product_id: string,
    relations: string[]
  ): Promise<ProductUser[]>;
  findByUser(user_id: string, relations: string[]): Promise<ProductUser[]>;
  create(dto: ICreateProductUserDTO): Promise<ProductUser | undefined>;
  save(productUser: ProductUser): Promise<ProductUser>;
  deleteByProductId(product_id: string): Promise<void>;
}
