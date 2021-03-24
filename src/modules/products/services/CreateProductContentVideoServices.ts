import { inject, injectable, container } from 'tsyringe';
import ProductContentVideo from '../infra/typeorm/entities/ProductContentVideo';
import IProductsContentRepository from '../repositories/IProductsContentRepository';
import IProductsContentVideoRepository from '../repositories/IProductsContentVideoRepository';
import SendNotificationProductServices from './SendNotificationProductServices';
import AppError from '@shared/errors/AppError';
import IProductsRepository from '../repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface IRequest {
    title: string;
    description: string;
    content_id: string;
    url?: string;
}

@injectable()
class CreateProductContentVideoServices {
    constructor(
        @inject('ProductsContentRepository')
        private productsContentRepository: IProductsContentRepository,
        @inject('ProductsContentVideoRepository')
        private productsContentVideoRepository: IProductsContentVideoRepository,
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) { }

    public async execute({ title, description, content_id, url }: IRequest): Promise<ProductContentVideo> {
        const sendNotificationProductServices = container.resolve(SendNotificationProductServices);
        const productContent = await this.productsContentRepository.findById(content_id);

        if (!productContent) {
            throw new AppError('Conteúdo não encontrado.', 400);
        }

        const product = await this.productsRepository.findById(productContent.product_id);

        const productContentVideo = await this.productsContentVideoRepository.create({
            title,
            description,
            content_id,
            url
        });

        await sendNotificationProductServices.execute({
            message: `Confira agora o novo vídeo do produto ${product?.title}. Acesse ${productContent.description}`,
            product_id: productContent.product_id
        });

        await this.cacheProvider.invalidatePrefix('productuser-list');

        return productContentVideo;
    }
}

export default CreateProductContentVideoServices;