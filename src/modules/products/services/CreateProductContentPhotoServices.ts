import { inject, injectable, container } from 'tsyringe';
import ProductContentPhoto from '../infra/typeorm/entities/ProductContentPhoto';
import IProductsContentRepository from '../repositories/IProductsContentRepository';
import IProductsContentPhotoRepository from '../repositories/IProductsContentPhotoRepository';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import SendNotificationProductServices from './SendNotificationProductServices';

interface IRequest {
    title: string;
    description: string;
    content_id: string;
    url?: string;
}

@injectable()
class CreateProductContentPhotoServices {
    constructor(
        @inject('ProductsContentRepository')
        private productsContentRepository: IProductsContentRepository,
        @inject('ProductsContentPhotoRepository')
        private productsContentPhotoRepository: IProductsContentPhotoRepository,
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) { }

    public async execute({ title, description, content_id, url }: IRequest): Promise<ProductContentPhoto> {
        const sendNotificationProductServices = container.resolve(SendNotificationProductServices);
        const productContent = await this.productsContentRepository.findById(content_id);

        if (!productContent) {
            throw new AppError('Conteúdo não encontrado.', 400);
        }

        const productContentPhoto = await this.productsContentPhotoRepository.create({
            title,
            description,
            content_id,
            url
        });

        const product = await this.productsRepository.findById(productContent.product_id);

        await sendNotificationProductServices.execute({
            message: `Confira agora a nova foto do produto ${product?.title}. Acesse ${productContent.description}`,
            product_id: productContent.product_id
        });

        await this.cacheProvider.invalidatePrefix('productuser-list');

        return productContentPhoto;
    }
}

export default CreateProductContentPhotoServices;