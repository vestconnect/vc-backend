import AppError from '@shared/errors/AppError';
import Product from '@modules/products/infra/typeorm/entities/Product';
import IProductsRepository from '../repositories/IProductsRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import { inject, injectable } from 'tsyringe';
import { classToClass } from 'class-transformer';

interface IRequestUpdateAvatarProduct {
    id: string;
    avatar: string;
    user_id: string;
}

@injectable()
class UpdateProductAvatarServices {
    constructor(
        @inject('ProductsRepository')
        private productsRepository: IProductsRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    public async execute({ id, avatar, user_id }: IRequestUpdateAvatarProduct): Promise<Product> {
        const product = await this.productsRepository.findById(id);

        if (!product) {
            throw new AppError('Produto não encontrado', 401);
        }

        if (product.user_id !== user_id) {
            throw new AppError('Produto não pertence ao usuário', 401);
        }

        if (product.avatar) {
            await this.storageProvider.deleteFile(product.avatar);
        }

        const fileName = await this.storageProvider.saveFile(avatar);

        product.avatar = fileName;

        await this.productsRepository.save(product);

        return classToClass(product);
    }
}

export default UpdateProductAvatarServices;