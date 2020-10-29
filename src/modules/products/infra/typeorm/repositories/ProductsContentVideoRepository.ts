import { Repository, getRepository } from 'typeorm';

import ProductContentVideo from '../entities/ProductContentVideo';
import IProductsContentVideoRepository from '@modules/products/repositories/IProductsContentVideoRepository';
import ICreateProductContentVideoDTO from '@modules/products/dtos/ICreateProductContentVideoDTO';

class ProductsContentVideoRepository implements IProductsContentVideoRepository {

    private ormRepository: Repository<ProductContentVideo>;

    constructor() {
        this.ormRepository = getRepository(ProductContentVideo);
    }

    public async findById(id: string): Promise<ProductContentVideo | undefined> {
        const productContentVideo = await this.ormRepository.findOne(id);

        return productContentVideo;
    }

    public async create(dto: ICreateProductContentVideoDTO): Promise<ProductContentVideo> {
        const productContentVideo = this.ormRepository.create(dto);

        await this.ormRepository.save(productContentVideo);

        return productContentVideo;
    }

    public async save(productContentVideo: ProductContentVideo): Promise<ProductContentVideo> {
        return await this.ormRepository.save(productContentVideo);
    }

}

export default ProductsContentVideoRepository;