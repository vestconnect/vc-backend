import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersTokenController from '../controllers/UsersTokenController';

const userTokenRouter = Router();
const usersTokenController = new UsersTokenController();

userTokenRouter.post('/', ensureAuthenticated, usersTokenController.create);

export default userTokenRouter;