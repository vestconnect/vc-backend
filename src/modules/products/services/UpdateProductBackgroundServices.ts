import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import Product from '@modules/products/infra/typeorm/entities/Product';
import { injectable, inject } from 'tsyringe';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import { classToClass } from 'class-transformer';

interface IRequestUpdateBackgroundProduct {
    id: string;
    background: string;
    user_id: string;
}

@injectable()
class UpdateProductBackgroundServices {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    public async execute({ id, background, user_id }: IRequestUpdateBackgroundProduct): Promise<Product> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Produto não encontrado', 401);
        }

        if (product.user_id !== user_id) {
            throw new AppError('Produto não pertence ao usuário', 401);
        }

        if (product.background) {
            await this.storageProvider.deleteFile(product.background);
        }

        const fileName = await this.storageProvider.saveFile(background);

        product.background = fileName;

        await this.productsRepository.save(product);

        return classToClass(product);
    }
}

export default UpdateProductBackgroundServices;