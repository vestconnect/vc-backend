import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import uploadConfig from '../../config/upload';
import Product from '../../models/Product';

interface RequestUpdateAvatarProduct {
    id: string;
    avatar: string;
}

interface RequestUpdateBackgroundProduct {
    id: string;
    background: string;
}

class ProductServices {
    public async updateAvatar({ id, avatar }: RequestUpdateAvatarProduct): Promise<Product> {
        const productsRepository = getRepository(Product);

        const product = await productsRepository.findOne({
            where: { id }
        });

        if (!product) {
            throw new AppError('Marca não encontrada', 401);
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

    public async updateBackground({ id, background }: RequestUpdateBackgroundProduct): Promise<Product> {
        const productsRepository = getRepository(Product);

        const product = await productsRepository.findOne({
            where: { id }
        });

        if (!product) {
            throw new AppError('Marca não encontrada', 401);
        }

        if (product.avatar) {
            const productAvatarFilePath = path.join(uploadConfig.directory, product.avatar);
            const productAvatarFileExists = await fs.promises.stat(productAvatarFilePath);

            if (productAvatarFileExists) {
                await fs.promises.unlink(productAvatarFilePath);
            }
        }

        product.background = background;

        await productsRepository.save(product);

        return product;
    }
}

export default ProductServices;