import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';
import ProductContent from '../../typeorm/entities/ProductContent';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsContentController from '../controllers/ProductsContentController';
import ProductContentBackgroundController from '../controllers/ProductContentBackgroundController';

const upload = multer(uploadConfig);
const productsContentRouter = Router();
const productsContentController = new ProductsContentController();
const productContentBackgroundController = new ProductContentBackgroundController();

productsContentRouter.get('/:id/:type', ensureAuthenticated, async (request, response) => {
    const productsContentRepository = getRepository(ProductContent);
    const product_id = request.params.id;
    const type = request.params.type;

    const productContent = await productsContentRepository.find({
        where: { product_id, type }
    });

    response.json(productContent);
});

productsContentRouter.post('/', ensureAuthenticated, productsContentController.create);
productsContentRouter.patch('/:id/background', ensureAuthenticated, upload.single('background'), productContentBackgroundController.update);

export default productsContentRouter;