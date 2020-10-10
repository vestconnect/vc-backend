import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import uploadConfig from '../../config/upload';
import Product from '../../models/Product';

interface RequestUpdateAvatarProduct {
    id: string;
    avatar: string;
    user_id: string;
}

interface RequestUpdateBackgroundProduct {
    id: string;
    background: string;
    user_id: string;
}

class ProductServices {
    public async updateAvatar({ id, avatar, user_id }: RequestUpdateAvatarProduct): Promise<Product> {
        const productsRepository = getRepository(Product);

        const product = await productsRepository.findOne({
            where: { id }
        });

        if (!product) {
            throw new AppError('Produto não encontrado', 401);
        }

        if (product.user_id !== user_id) {
            throw new AppError('Produto não pertence ao usuário', 401);
        }

        if (product.avatar) {
            const productAvatarFilePath = path.join(uploadConfig.directory, product.avatar);
            const productAvatarFileExists = await fs.promises.stat(productAvatarFilePath);

            if (productAvatarFileExists) {
                await fs.promises.unlink(productAvatarFilePath);
            }
        }

        product.avatar = avatar;

        await productsRepository.save(product);

        return product;
    }

    public async updateBackground({ id, background, user_id }: RequestUpdateBackgroundProduct): Promise<Product> {
        const productsRepository = getRepository(Product);

        const product = await productsRepository.findOne({
            where: { id }
        });

        if (!product) {
            throw new AppError('Marca não encontrada', 401);
        }

        if (product.user_id !== user_id) {
            throw new AppError('Produto não pertence ao usuário', 401);
        }

        if (product.background) {
            const productBackgroundFilePath = path.join(uploadConfig.directory, product.background);
            const productBackgroundFileExists = await fs.promises.stat(productBackgroundFilePath);

            if (productBackgroundFileExists) {
                await fs.promises.unlink(productBackgroundFilePath);
            }
        }

        product.background = background;

        await productsRepository.save(product);

        return product;
    }
}

export default ProductServices;