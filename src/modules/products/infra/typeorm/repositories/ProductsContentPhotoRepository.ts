import { Repository, getRepository } from 'typeorm';

import ProductContentPhoto from '../entities/ProductContentPhoto';
import IProductsContentPhotoRepository from '@modules/products/repositories/IProductsContentPhotoRepository';
import ICreateProductContentPhotoDTO from '@modules/products/dtos/ICreateProductContentPhotoDTO';

class ProductsContentPhotoRepository implements IProductsContentPhotoRepository {

    private ormRepository: Repository<ProductContentPhoto>;

    constructor() {
        this.ormRepository = getRepository(ProductContentPhoto);
    }

    public async findById(id: string): Promise<ProductContentPhoto | undefined> {
        const productContentPhoto = await this.ormRepository.findOne(id);

        return productContentPhoto;
    }

    public async create(dto: ICreateProductContentPhotoDTO): Promise<ProductContentPhoto> {
        const productContentPhoto = this.ormRepository.create(dto);

        await this.ormRepository.save(productContentPhoto);

        return productContentPhoto;
    }

    public async save(productContentPhoto: ProductContentPhoto): Promise<ProductContentPhoto> {
        return await this.ormRepository.save(productContentPhoto);
    }

}

export default ProductsContentPhotoRepository;