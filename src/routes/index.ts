import { Router } from 'express';

import UsersRouter from './Users.routes';
import SessionsRouter from './Sessions.routes';

const routes = Router();

routes.use('/users', UsersRouter);
routes.use('/sessions', SessionsRouter);

export default routes;