import { Router } from 'express';

import UsersRouter from '@modules/users/infra/http/routes/Users.routes';
import SessionsRouter from '@modules/users/infra/http/routes/Sessions.routes';
import UsersTokenRouter from '@modules/users/infra/http/routes/UsersToken.routes';
import UserTokenResetRouter from '@modules/users/infra/http/routes/UserTokenReset.routes';
import ProductsRouter from '@modules/products/infra/http/routes/Products.routes';
import ProductsContentRouter from '@modules/products/infra/http/routes/ProductsContent.routes';
import ProductsContentRouterPhotos from '@modules/products/infra/http/routes/ProductsContentPhotos.routes';
import ProductsContentRouterTexts from '@modules/products/infra/http/routes/ProductsContentTexts.routes';
import ProductsContentRouterVideos from '@modules/products/infra/http/routes/ProductsContentVideos.routes';
import ProductsTagsRouter from '@modules/products/infra/http/routes/ProductsTags.routes';
import ProductsTagsNfcRouter from '@modules/products/infra/http/routes/ProductsTagsNfc.routes';
import ProductsUserRouter from '@modules/products/infra/http/routes/ProductsUser.routes';
import PasswordsRouter from '@modules/products/infra/http/routes/Passwords.routes';

const routes = Router();

routes.use('/users', UsersRouter);
routes.use('/sessions', SessionsRouter);
routes.use('/token', UsersTokenRouter);
routes.use('/products', ProductsRouter);
routes.use('/productscontent', ProductsContentRouter);
routes.use('/productscontentphotos', ProductsContentRouterPhotos);
routes.use('/productscontenttexts', ProductsContentRouterTexts);
routes.use('/productscontentvideos', ProductsContentRouterVideos);
routes.use('/productstags', ProductsTagsRouter);
routes.use('/productstagsnfc', ProductsTagsNfcRouter);
routes.use('/productsuser', ProductsUserRouter);
routes.use('/password', UserTokenResetRouter);
routes.use('/passwords', PasswordsRouter);

export default routes;