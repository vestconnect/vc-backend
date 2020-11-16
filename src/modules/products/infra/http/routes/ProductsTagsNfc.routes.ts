import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsTagsNfcController from '../controllers/ProductsTagsNfcController';
import multer from 'multer';
import uploadConfig from '@config/uploadXls';

const productTagRouter = Router();
const upload = multer(uploadConfig.multer);
const productsTagsNfcController = new ProductsTagsNfcController();

productTagRouter.get('/:id', ensureAuthenticated, productsTagsNfcController.index);
productTagRouter.post('/:id', ensureAuthenticated, upload.single('file'), productsTagsNfcController.execute);
productTagRouter.patch('/inactive/all', ensureAuthenticated, productsTagsNfcController.inactive);
productTagRouter.patch('/inactive/:id/nfc', ensureAuthenticated, productsTagsNfcController.inactive);

export default productTagRouter;
