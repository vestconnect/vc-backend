import ProductContentText from '../infra/typeorm/entities/ProductContentText';
import ICreateProductContentTextDTO from '../dtos/ICreateProductContentTextDTO';

export default interface IProductsContentTextRepository {
    findById(id: string): Promise<ProductContentText | undefined>;
    create(data: ICreateProductContentTextDTO): Promise<ProductContentText>;
    save(productContentText: ProductContentText): Promise<ProductContentText>;
}