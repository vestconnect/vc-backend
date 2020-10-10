import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '../../errors/AppError';
import uploadConfig from '../../config/upload';
import ProductContentVideo from '../../models/ProductContentVideo';
import SendNotifications from '../../notifications/SendNotifications';
import productContentVideoRouter from '../../routes/ProductsContentVideos.routes';

interface RequestBackground {
    id: string;
    background: string;
}

interface RequestFile {
    id: string;
    file: string;
}

class ProductContentVideoServices {
    public async updateBackground({ id, background }: RequestBackground): Promise<ProductContentVideo> {
        const productContentVideoRepository = getRepository(ProductContentVideo);

        const productContentVideo = await productContentVideoRepository.findOne({
            where: { id }
        });

        if (!productContentVideo) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContentVideo.background) {
            const productContentVideoBackgroundFilePath = path.join(uploadConfig.directory, productContentVideo.background);
            const productContentVideoBackgroundFileExists = await fs.promises.stat(productContentVideoBackgroundFilePath);

            if (productContentVideoBackgroundFileExists) {
                await fs.promises.unlink(productContentVideoBackgroundFilePath);
            }
        }

        productContentVideo.background = background;

        await productContentVideoRepository.save(productContentVideo);

        return productContentVideo;
    }

    public async updateFile({ id, file }: RequestFile): Promise<ProductContentVideo> {
        const sendNotifications = new SendNotifications();
        const productContentVideoRepository = getRepository(ProductContentVideo);

        const productContentVideo = await productContentVideoRepository.findOne({
            where: { id }
        });

        if (!productContentVideo) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        if (productContentVideo.file) {
            const productContentVideoFileFilePath = path.join(uploadConfig.directory, productContentVideo.file);
            const productContentVideoFileFileExists = await fs.promises.stat(productContentVideoFileFilePath);

            if (productContentVideoFileFileExists) {
                await fs.promises.unlink(productContentVideoFileFilePath);
            }
        }

        productContentVideo.file = file;

        await productContentVideoRepository.save(productContentVideo);
        await sendNotifications.execute({ content_id: productContentVideo.content_id });

        return productContentVideo;
    }
}

export default ProductContentVideoServices;