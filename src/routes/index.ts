import { Router } from 'express';

import UsersRouter from './Users.routes';
import SessionsRouter from './Sessions.routes';
import UsersTokenRouter from './UsersToken.routes';
import BrandsRouter from './Brands.routes';
import ProductsRouter from './Products.routes';
import ProductsTagsRouter from './ProductsTags.routes';
import ProductsContentRouter from './ProductsContent.routes';
import ProductsContentRouterPhotos from './ProductsContentPhotos.routes';
import ProductsContentRouterTexts from './ProductsContentTexts.routes';
import ProductsContentRouterVideos from './ProductsContentVideos.routes';
import ProductsUserRouter from './ProductsUser.routes';

const routes = Router();

routes.use('/users', UsersRouter);
routes.use('/token', UsersTokenRouter);
routes.use('/sessions', SessionsRouter);
routes.use('/brands', BrandsRouter);
routes.use('/products', ProductsRouter);
routes.use('/productstags', ProductsTagsRouter);
routes.use('/productscontent', ProductsContentRouter);
routes.use('/productscontentphotos', ProductsContentRouterPhotos);
routes.use('/productscontenttexts', ProductsContentRouterTexts);
routes.use('/productscontentvideos', ProductsContentRouterVideos);
routes.use('/productsuser', ProductsUserRouter);

export default routes;