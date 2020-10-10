import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';
import ProductContentPhoto from '../models/ProductContentPhoto';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import ProductContentPhotoServices from '../services/ProductContentPhoto/ProductContentPhotoServices';

const productContentPhotoRouter = Router();
const upload = multer(uploadConfig);

productContentPhotoRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const productContentPhotoRepository = getRepository(ProductContentPhoto);
    const content_id = request.params.id;

    const productContentPhoto = await productContentPhotoRepository.find({
        where: { content_id }
    });

    response.json(productContentPhoto);
});

productContentPhotoRouter.post('/', ensureAuthenticated, async (request, response) => {
    const productContentPhotoRepository = getRepository(ProductContentPhoto);
    const { title, description, content_id } = request.body;

    const productContentPhoto = productContentPhotoRepository.create({
        title,
        description,
        content_id
    });

    await productContentPhotoRepository.save(productContentPhoto);

    response.json(productContentPhoto);
});

productContentPhotoRouter.patch('/:id/background', ensureAuthenticated, upload.single('background'), async (request, response) => {
    const productContentPhotoServices = new ProductContentPhotoServices();
    const id = request.params.id;
    const background = request.file.filename;

    const productContentPhoto = await productContentPhotoServices.updateBackground({
        id,
        background
    });

    response.json(productContentPhoto);
});

productContentPhotoRouter.patch('/:id/file', ensureAuthenticated, upload.single('background'), async (request, response) => {
    const productContentPhotoServices = new ProductContentPhotoServices();
    const id = request.params.id;
    const file = request.file.filename;

    const productContentPhoto = await productContentPhotoServices.updateFile({
        id,
        file
    });

    response.json(productContentPhoto);
});

export default productContentPhotoRouter;