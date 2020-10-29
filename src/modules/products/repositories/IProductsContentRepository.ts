import ProductContent from '../infra/typeorm/entities/ProductContent';
import ICreateProductContentDTO from '../dtos/ICreateProductContentDTO';
import IFindProductContentByType from '../dtos/IFindProductContentByType';

export default interface IProductsContentRepository {
    findById(id: string): Promise<ProductContent | undefined>;
    findContentByType(data: IFindProductContentByType): Promise<ProductContent[]>;
    create(data: ICreateProductContentDTO): Promise<ProductContent>;
    save(productContent: ProductContent): Promise<ProductContent>;
}