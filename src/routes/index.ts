import { Router } from 'express';

import UsersRouter from './Users.routes';
import SessionsRouter from './Sessions.routes';
import UsersTokenRouter from './UsersToken.routes';
import BrandsRouter from './Brands.routes';
import ProductsRouter from './Products.routes';
import ProductsTagsRouter from './ProductsTags.routes';

const routes = Router();

routes.use('/users', UsersRouter);
routes.use('/token', UsersTokenRouter);
routes.use('/sessions', SessionsRouter);
routes.use('/brands', BrandsRouter);
routes.use('/products', ProductsRouter);
routes.use('/productstags', ProductsTagsRouter);

export default routes;