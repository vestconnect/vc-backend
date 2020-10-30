import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';
import Product from '@modules/products/infra/typeorm/entities/Product';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import ProductsController from '../controllers/ProductsController';
import ProductAvatarController from '../controllers/ProductAvatarController';
import ProductBackgroundController from '../controllers/ProductBackgroundController';

const productsRouter = Router();
const upload = multer(uploadConfig.multer);
const productsController = new ProductsController();
const productAvatarController = new ProductAvatarController();
const productBackgroundController = new ProductBackgroundController();

productsRouter.get('/', ensureAuthenticated, async (request, response) => {
    const productRepository = getRepository(Product);
    const user_id = request.user.id

    const products = await productRepository.find({
        where: { user_id }
    });

    response.json(products);
});
productsRouter.post('/', ensureAuthenticated, productsController.create);
productsRouter.patch('/:id/avatar', ensureAuthenticated, upload.single('avatar'), productAvatarController.update);
productsRouter.patch('/:id/background', ensureAuthenticated, upload.single('background'), productBackgroundController.update);

export default productsRouter;