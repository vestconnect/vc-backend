import { inject, injectable, container } from 'tsyringe';
import IProductsContentRepository from '../repositories/IProductsContentRepository';
import ProductContent from '../infra/typeorm/entities/ProductContent';
import UpdateReadProductUserNotificationServices from './UpdateReadProductUserNotificationServices';
import { classToClass } from 'class-transformer';

interface IRequest {
    user_id: string;
    product_id: string;
    type: string;
}

type IResponse = Array<ProductContent>;

@injectable()
class SelectProductContentServices {
    constructor(
        @inject('ProductsContentRepository')
        private productsContentRepository: IProductsContentRepository
    ) { }

    public async execute({ user_id, product_id, type }: IRequest): Promise<IResponse> {
        const updateReadProductUserNotificationService = container.resolve(UpdateReadProductUserNotificationServices);

        const productsContent = await this.productsContentRepository.findContentByType({
            product_id,
            type
        });

        await updateReadProductUserNotificationService.execute(user_id);

        return classToClass(productsContent);
    }
}

export default SelectProductContentServices;