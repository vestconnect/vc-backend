import { getRepository } from 'typeorm';
import { Router } from 'express';

import multer from 'multer';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import UserPasswordController from '../controllers/UserPasswordController';
import UserAvatarController from '../controllers/UserAvatarController';

import User from '@modules/users/infra/typeorm/entities/User';

const usersRouter = Router();
const upload = multer(uploadConfig);
const usersController = new UsersController();
const userPasswordController = new UserPasswordController();
const userAvatarController = new UserAvatarController();

usersRouter.get('/', async (request, response) => {
    const userRepository = getRepository(User);

    const users = await userRepository.find();

    response.json(users);
});

usersRouter.post('/', usersController.create);
usersRouter.patch('/password', ensureAuthenticated, userPasswordController.update);
usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarController.update);

export default usersRouter;