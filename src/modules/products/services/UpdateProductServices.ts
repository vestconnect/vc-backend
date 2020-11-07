import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
    nfc_id: string;
    title: string;
    subtitle: string;
    validate: Date;
    description: string;
}

@injectable()
class UpdateProductServices {
    constructor(
        @inject('ProductsRepository')
        private productRepository: IProductsRepository
    ) { }

    public async update({ id, nfc_id, title, subtitle, validate, description }: IRequest): Promise<Product> {
        const product = await this.productRepository.findById(id);

        if (!product) {
            throw new AppError('Produto não encontrado');
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

        await this.productRepository.save(product);

        return product;
    }
}

export default UpdateProductServices;