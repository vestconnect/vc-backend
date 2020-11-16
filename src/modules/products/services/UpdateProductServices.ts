import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    nfc_id: string;
    title: string;
    subtitle: string;
    validate: Date;
    description: string;
    active: boolean;
}

@injectable()
class UpdateProductServices {
    constructor(
        @inject('ProductsRepository')
        private productRepository: IProductsRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) { }

    public async update({ id, nfc_id, title, subtitle, validate, description, active }: IRequest): Promise<Product> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new AppError('Produto não encontrado', 400);
        }

        const existsNfc = await this.productRepository.findByNfc(nfc_id);

        if (existsNfc && existsNfc.id !== product.id) {
            throw new AppError('NFC já cadastrado.', 401);
        }

        product.nfc_id = nfc_id;
        product.title = title;
        product.subtitle = subtitle;
        product.validate = validate;
        product.description = description;
        product.active = active;

        await this.productRepository.save(product);

        await this.cacheProvider.invalidatePrefix('productuser-list');

        return product;
    }
}

export default UpdateProductServices;