import { getRepository, Repository } from "typeorm";

import ProductContent from "../entities/ProductContent";
import IProductsContentRepository from "@modules/products/repositories/IProductsContentRepository";
import ICreateProductContentDTO from "@modules/products/dtos/ICreateProductContentDTO";
import IFindProductContentByType from "@modules/products/dtos/IFindProductContentByType";

class ProductsContentRepository implements IProductsContentRepository {
  private ormRepository: Repository<ProductContent>;

  constructor() {
    this.ormRepository = getRepository(ProductContent);
  }

  public async findById(id: string): Promise<ProductContent | undefined> {
    const productContent = await this.ormRepository.findOne(id, {
      relations: ["product"],
    });

    return productContent;
  }

  public async findByProductId(product_id: string): Promise<ProductContent[]> {
    const productContent = await this.ormRepository.find({
      where: { product_id },
    });

    return productContent;
  }

  public async findContentByType({
    product_id,
    type,
  }: IFindProductContentByType): Promise<ProductContent[]> {
    const productContent = await this.ormRepository.find({
      where: { product_id, type },
    });

    return productContent;
  }

  public async create(
    dataProductContent: ICreateProductContentDTO
  ): Promise<ProductContent> {
    const productContent = this.ormRepository.create(dataProductContent);

    await this.ormRepository.save(productContent);

    return productContent;
  }

  public async save(productContent: ProductContent): Promise<ProductContent> {
    return await this.ormRepository.save(productContent);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async deleteByProductId(product_id: string): Promise<void> {
    await this.ormRepository.delete({ product_id });
  }
}

export default ProductsContentRepository;
