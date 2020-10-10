import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';
import ProductContentText from '../models/ProductContentText';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import ProductContentTextServices from '../services/ProductContentText/ProductContentTextServices';

const productContentTextRouter = Router();
const upload = multer(uploadConfig);

productContentTextRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const productContentTextRepository = getRepository(ProductContentText);
    const content_id = request.params.id;

    const productContentText = await productContentTextRepository.find({
        where: { content_id }
    });

    response.json(productContentText);
});

productContentTextRouter.post('/', ensureAuthenticated, async (request, response) => {
    const productContentTextRepository = getRepository(ProductContentText);
    const { title, description, content_id } = request.body;

    const productContentText = productContentTextRepository.create({
        title,
        description,
        content_id
    });

    await productContentTextRepository.save(productContentText);

    response.json(productContentText);
});

productContentTextRouter.patch('/:id/background', ensureAuthenticated, upload.single('background'), async (request, response) => {
    const productContentTextServices = new ProductContentTextServices();
    const id = request.params.id;
    const background = request.file.filename;

    const productContentText = await productContentTextServices.updateBackground({
        id,
        background
    });

    response.json(productContentText);
});

productContentTextRouter.patch('/:id/file', ensureAuthenticated, upload.single('background'), async (request, response) => {
    const productContentTextServices = new ProductContentTextServices();
    const id = request.params.id;
    const file = request.file.filename;

    const productContentText = await productContentTextServices.updateFile({
        id,
        file
    });

    response.json(productContentText);
});

export default productContentTextRouter;