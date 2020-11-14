import { Router } from 'express';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import PasswordsController from '../controllers/PasswordsController';
import multer from 'multer';
import uploadConfig from '@config/upload';

const passwordRouter = Router();
const upload = multer(uploadConfig.multer);
const passwordsController = new PasswordsController();

passwordRouter.get('/', ensureAuthenticated, passwordsController.index);
passwordRouter.post('/', ensureAuthenticated, upload.single('file'), passwordsController.execute);
passwordRouter.patch('/inactive/all', ensureAuthenticated, passwordsController.inactive);
passwordRouter.patch('/inactive/:id', ensureAuthenticated, passwordsController.inactive);

export default passwordRouter;
