import { getRepository } from 'typeorm';
import { Router } from 'express';

import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserPasswordController from '../controllers/UserPasswordController';
import UserAvatarController from '../controllers/UserAvatarController';
import UserBackgroundController from '../controllers/UserBackgroundController';
import ConfirmEmailController from '../controllers/ConfirmEmailController';
import ProvidersController from '../controllers/ProvidersController';
import UserActiveController from '../controllers/UserActiveController';
import UsersProviderController from '../controllers/UsersProviderController';
import User from '@modules/users/infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userPasswordController = new UserPasswordController();
const userAvatarController = new UserAvatarController();
const userBackgroundController = new UserBackgroundController();
const confirmEmailController = new ConfirmEmailController();
const providersController = new ProvidersController();
const userActiveController = new UserActiveController();
const usersProviderController = new UsersProviderController();

usersRouter.get('/', ensureAuthenticated, providersController.indexOld);
usersRouter.get('/providers', ensureAuthenticated, providersController.index);
usersRouter.put('/providers/:id', ensureAuthenticated, usersProviderController.update);
usersRouter.get('/:id', async (request, response) => {
    const userRepository = getRepository(User);
    const id = request.params.id;

    const user = await userRepository.findOne({ id });

    response.json(classToClass(user));
});
usersRouter.post('/', usersController.create);
usersRouter.patch('/password', ensureAuthenticated, userPasswordController.update);
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update);
usersRouter.patch('/:id/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.updateProvider);
usersRouter.patch('/:id/background', ensureAuthenticated, upload.single('background'), userBackgroundController.updateProvider);
usersRouter.patch('/:id/active', ensureAuthenticated, userActiveController.update);
usersRouter.patch('/confirm', confirmEmailController.update);
usersRouter.post('/send', usersController.index);

export default usersRouter;