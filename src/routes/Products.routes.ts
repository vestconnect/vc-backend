import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';
import Product from '../models/Product';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
import ProductServices from '../services/Product/ProductServices';

const productsRouter = Router();
const upload = multer(uploadConfig);

productsRouter.get('/', ensureAuthenticated, async (request, response) => {
    const productRepository = getRepository(Product);
    const user_id = request.user.id

    const products = await productRepository.find({
        where: { user_id }
    });

    response.json(products);
});

productsRouter.post('/', ensureAuthenticated, async (request, response) => {
    const productRepository = getRepository(Product);
    const user_id = request.user.id;
    const { nfc_id, title, subtitle, validate, description } = request.body;

    const product = productRepository.create({
        nfc_id,
        user_id,
        title,
        subtitle,
        validate,
        description
    });

    await productRepository.save(product);

    response.json(product);
});

productsRouter.patch('/:id/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    const productServices = new ProductServices();
    const id = request.params.id;
    const user_id = request.user.id;
    const avatar = request.file.filename;

    const product = await productServices.updateAvatar({ id, avatar, user_id });

    response.json(product);
});

productsRouter.patch('/:id/background', ensureAuthenticated, upload.single('background'), async (request, response) => {
    const productServices = new ProductServices();
    const id = request.params.id;
    const user_id = request.user.id;
    const background = request.file.filename;

    const product = await productServices.updateBackground({ id, background, user_id });

    response.json(product);
});

export default productsRouter;