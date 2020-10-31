import { getRepository } from 'typeorm';
import { Router } from 'express';

import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserPasswordController from '../controllers/UserPasswordController';
import UserAvatarController from '../controllers/UserAvatarController';
import ConfirmEmailController from '../controllers/ConfirmEmailController';
import User from '@modules/users/infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

const usersRouter = Router();
const upload = multer(uploadConfig.multer);
const usersController = new UsersController();
const userPasswordController = new UserPasswordController();
const userAvatarController = new UserAvatarController();
const confirmEmailController = new ConfirmEmailController();

usersRouter.get('/', async (request, response) => {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    response.json(classToClass(users));
});

usersRouter.post('/', usersController.create);
usersRouter.patch('/password', ensureAuthenticated, userPasswordController.update);
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update);
usersRouter.patch('/confirm', confirmEmailController.update);
usersRouter.post('/send', usersController.index);

export default usersRouter;