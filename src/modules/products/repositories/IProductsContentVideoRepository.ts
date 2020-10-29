import ProductContentVideo from '../infra/typeorm/entities/ProductContentVideo';
import ICreateProductContentVideoDTO from '../dtos/ICreateProductContentVideoDTO';

export default interface IProductsContentVideoRepository {
    findById(id: string): Promise<ProductContentVideo | undefined>;
    create(data: ICreateProductContentVideoDTO): Promise<ProductContentVideo>;
    save(productContentVideo: ProductContentVideo): Promise<ProductContentVideo>;
}