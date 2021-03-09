import { Repository, getRepository } from "typeorm";

import ProductContentPhoto from "../entities/ProductContentPhoto";
import IProductsContentPhotoRepository from "@modules/products/repositories/IProductsContentPhotoRepository";
import ICreateProductContentPhotoDTO from "@modules/products/dtos/ICreateProductContentPhotoDTO";

class ProductsContentPhotoRepository
  implements IProductsContentPhotoRepository {
  private ormRepository: Repository<ProductContentPhoto>;

  constructor() {
    this.ormRepository = getRepository(ProductContentPhoto);
  }

  public async count(): Promise<number> {
    const contentPhoto = await this.ormRepository.count();

    return contentPhoto;
  }

  public async findById(id: string): Promise<ProductContentPhoto | undefined> {
    const productContentPhoto = await this.ormRepository.findOne(id);

    return productContentPhoto;
  }

  public async create(
    dto: ICreateProductContentPhotoDTO
  ): Promise<ProductContentPhoto> {
    const productContentPhoto = this.ormRepository.create(dto);

    await this.ormRepository.save(productContentPhoto);

    return productContentPhoto;
  }

  public async save(
    productContentPhoto: ProductContentPhoto
  ): Promise<ProductContentPhoto> {
    return await this.ormRepository.save(productContentPhoto);
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete({ id });
  }

  public async deleteByContentId(content_id: string): Promise<void> {
    await this.ormRepository.delete({ content_id });
  }
}

export default ProductsContentPhotoRepository;
