import { getRepository, Repository } from "typeorm";

import Product from "../entities/Product";
import IProductsRepository from "@modules/products/repositories/IProductsRepository";
import ICreateProductDTO from "@modules/products/dtos/ICreateProductDTO";

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async findByNfc(nfc_id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: { nfc_id },
    });

    return product;
  }

  public async create(dataProduct: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(dataProduct);

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    return await this.ormRepository.save(product);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }
}

export default ProductsRepository;
