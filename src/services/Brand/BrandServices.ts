import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import uploadConfig from '../../config/upload';
import Brand from '../../models/Brand';

interface RequestUpdateAvatarBrand {
    id: string;
    avatar: string;
}

class BrandServices {
    public async updateAvatar({ id, avatar }: RequestUpdateAvatarBrand): Promise<Brand> {
        const brandsRepository = getRepository(Brand);

        const brand = await brandsRepository.findOne({
            where: { id }
        });

        if (!brand) {
            throw new AppError('Marca não encontrada', 401);
        }

        if (brand.avatar) {
            const brandAvatarFilePath = path.join(uploadConfig.directory, brand.avatar);
            const brandAvatarFileExists = await fs.promises.stat(brandAvatarFilePath);

            if (brandAvatarFileExists) {
                await fs.promises.unlink(brandAvatarFilePath);
            }
        }

        brand.avatar = avatar;

        await brandsRepository.save(brand);

        return brand;
    }
}

export default BrandServices;