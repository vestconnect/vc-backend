import { getRepository } from 'typeorm';
import { Router } from 'express';
import multer from 'multer';
import ProductContentText from '../../typeorm/entities/ProductContentText';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import ProductsContentTextController from '../controllers/ProductsContentTextController';
import ProductContentTextBackgroundController from '../controllers/ProductContentTextBackgroundController';
import ProductContentTextFileController from '../controllers/ProductContentTextFileController';

const productContentTextRouter = Router();
const upload = multer(uploadConfig);
const productsContentTextController = new ProductsContentTextController();
const productContentTextBackgroundController = new ProductContentTextBackgroundController();
const productContentTextFileController = new ProductContentTextFileController();

productContentTextRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const productContentTextRepository = getRepository(ProductContentText);
    const content_id = request.params.id;

    const productContentText = await productContentTextRepository.find({
        where: { content_id }
    });

    response.json(productContentText);
});

productContentTextRouter.post('/', ensureAuthenticated, productsContentTextController.create);
productContentTextRouter.patch('/:id/background', ensureAuthenticated, upload.single('background'), productContentTextBackgroundController.update);
productContentTextRouter.patch('/:id/file', ensureAuthenticated, upload.single('file'), productContentTextFileController.update);

export default productContentTextRouter;