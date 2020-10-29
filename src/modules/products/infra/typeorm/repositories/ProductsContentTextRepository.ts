import { Repository, getRepository } from 'typeorm';

import ProductContentText from '../entities/ProductContentText';
import IProductsContentPhotoRepository from '@modules/products/repositories/IProductsContentPhotoRepository';
import ICreateProductContentTextDTO from '@modules/products/dtos/ICreateProductContentTextDTO';

class ProductsContentPhotoRepository implements IProductsContentPhotoRepository {

    private ormRepository: Repository<ProductContentText>;

    constructor() {
        this.ormRepository = getRepository(ProductContentText);
    }

    public async findById(id: string): Promise<ProductContentText | undefined> {
        const productContentText = await this.ormRepository.findOne(id);

        return productContentText;
    }

    public async create(dto: ICreateProductContentTextDTO): Promise<ProductContentText> {
        const productContentText = this.ormRepository.create(dto);

        await this.ormRepository.save(productContentText);

        return productContentText;
    }

    public async save(productContentText: ProductContentText): Promise<ProductContentText> {
        return await this.ormRepository.save(productContentText);
    }

}

export default ProductsContentPhotoRepository;