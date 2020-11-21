import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ProductContent from '../../typeorm/entities/ProductContent';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsContentController from '../controllers/ProductsContentController';
import ProductContentBackgroundController from '../controllers/ProductContentBackgroundController';
import { classToClass } from 'class-transformer';

const upload = multer(uploadConfig.multer);
const productsContentRouter = Router();
const productsContentController = new ProductsContentController();
const productContentBackgroundController = new ProductContentBackgroundController();

productsContentRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const productsContentRepository = getRepository(ProductContent);
    const product_id = request.params.id;

    const productContent = await productsContentRepository.find({
        where: { product_id }
    });

    response.json(classToClass(productContent));
});

productsContentRouter.get('/:id/:type', ensureAuthenticated, productsContentController.index);
productsContentRouter.post('/', ensureAuthenticated, productsContentController.create);
productsContentRouter.patch('/:id/background', ensureAuthenticated, upload.single('background'), productContentBackgroundController.update);

export default productsContentRouter;