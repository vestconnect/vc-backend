import { getRepository } from 'typeorm';
import { Router } from 'express';
import ProductContent from '../models/ProductContent';

import multer from 'multer';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import ProductContentServices from '../services/ProductContent/ProductContentServices';

const upload = multer(uploadConfig);
const productsContentRouter = Router();

productsContentRouter.get('/:id/:type', ensureAuthenticated, async (request, response) => {
    const productsContentRepository = getRepository(ProductContent);
    const product_id = request.params.id;
    const type = request.params.type;

    const productContent = await productsContentRepository.find({
        where: { product_id, type }
    });

    response.json(productContent);
});

productsContentRouter.post('/', ensureAuthenticated, async (request, response) => {
    const productsContentRepository = getRepository(ProductContent);
    const { description, type, product_id } = request.body;

    const productContent = productsContentRepository.create({
        description,
        type,
        product_id
    });

    await productsContentRepository.save(productContent);

    response.json(productContent);
});

productsContentRouter.patch('/:id/background', ensureAuthenticated, upload.single('background'), async (request, response) => {
    const productContentServices = new ProductContentServices();
    const id = request.params.id;
    const user_id = request.user.id;
    const background = request.file.filename;

    const productContent = await productContentServices.updateBackground({
        id,
        background,
        user_id
    });

    response.json(productContent);
});

export default productsContentRouter;