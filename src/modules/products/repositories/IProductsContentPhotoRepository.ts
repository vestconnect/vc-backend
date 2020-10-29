import ProductContentPhoto from '../infra/typeorm/entities/ProductContentPhoto';
import ICreateProductContentPhotoDTO from '../dtos/ICreateProductContentPhotoDTO';

export default interface IProductsContentPhotoRepository {
    findById(id: string): Promise<ProductContentPhoto | undefined>;
    create(data: ICreateProductContentPhotoDTO): Promise<ProductContentPhoto>;
    save(productContentPhoto: ProductContentPhoto): Promise<ProductContentPhoto>;
}