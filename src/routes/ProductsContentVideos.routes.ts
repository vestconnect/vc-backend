import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';
import ProductContentVideo from '../models/ProductContentVideo';
import ProductUserNotification from '../models/ProductUserNotification';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import ProductContentVideoServices from '../services/ProductContentVideo/ProductContentVideoServices';

const productContentVideoRouter = Router();
const upload = multer(uploadConfig);

productContentVideoRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const productContentVideoRepository = getRepository(ProductContentVideo);
    const productUserNotificationRepository = getRepository(ProductUserNotification);
    const user_id = request.user.id;
    const content_id = request.params.id;

    const productContentVideo = await productContentVideoRepository.find({
        where: { content_id }
    });

    const productUserNotification = await productUserNotificationRepository.find({
        where: { user_id, read: false }
    });

    if (productUserNotification.length) {
        productUserNotification.forEach(item => {
            item.read = true;
        });

        await productUserNotificationRepository.save(productUserNotification);
    }

    response.json(productContentVideo);
});

productContentVideoRouter.post('/', ensureAuthenticated, async (request, response) => {
    const productContentVideoRepository = getRepository(ProductContentVideo);
    const { title, description, content_id } = request.body;

    const productContentVideo = productContentVideoRepository.create({
        title,
        description,
        content_id
    });

    await productContentVideoRepository.save(productContentVideo);

    response.json(productContentVideo);
});

productContentVideoRouter.patch('/:id/background', ensureAuthenticated, upload.single('background'), async (request, response) => {
    const productContentVideoServices = new ProductContentVideoServices();
    const id = request.params.id;
    const background = request.file.filename;

    const productContentVideo = await productContentVideoServices.updateBackground({
        id,
        background
    });

    response.json(productContentVideo);
});

productContentVideoRouter.patch('/:id/file', ensureAuthenticated, upload.single('file'), async (request, response) => {
    const productContentVideoServices = new ProductContentVideoServices();
    const id = request.params.id;
    const file = request.file.filename;

    const productContentVideo = await productContentVideoServices.updateFile({
        id,
        file
    });

    response.json(productContentVideo);
});

export default productContentVideoRouter;