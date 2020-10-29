import { container } from 'tsyringe';

import '@modules/users/providers';
import './providers';

import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import ProductsRepository from '@modules/products/infra/typeorm/repositories/ProductsRepository';

import IProductsContentRepository from '@modules/products/repositories/IProductsContentRepository';
import ProductsContentRepository from '@modules/products/infra/typeorm/repositories/ProductsContentRepository';

import IProductsContentPhotoRepository from '@modules/products/repositories/IProductsContentPhotoRepository';
import ProductsContentPhotoRepository from '@modules/products/infra/typeorm/repositories/ProductsContentPhotoRepository';

import IProductsContentTextRepository from '@modules/products/repositories/IProductsContentTextRepository';
import ProductsContentTextRepository from '@modules/products/infra/typeorm/repositories/ProductsContentTextRepository';

import IProductsContentVideoRepository from '@modules/products/repositories/IProductsContentVideoRepository';
import ProductsContentVideoRepository from '@modules/products/infra/typeorm/repositories/ProductsContentVideoRepository';

import IProductsTagsRepository from '@modules/products/repositories/IProductsTagsRepository';
import ProductsTagsRepository from '@modules/products/infra/typeorm/repositories/ProductsTagsRepository';

import IProductsUserRepository from '@modules/products/repositories/IProductsUserRepository';
import ProductsUserRepository from '@modules/products/infra/typeorm/repositories/ProductsUserRepository';

import IProductsUserNotificationsRepository from '@modules/products/repositories/IProductsUserNotificationsRepository';
import ProductsUserNotificationsRepository from '@modules/products/infra/typeorm/repositories/ProductsUserNotificationsRepository';

import ISelectedProductsUserNotificationsRepository from '@modules/products/repositories/ISelectedProductsUserNotificationsRepository';
import SelectedProductsUserNotificationsRepository from '@modules/products/infra/typeorm/repositories/SelectedProductsUserNotificationsRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UsersTokenRepository from '@modules/users/infra/typeorm/repositories/UsersTokenRepository';

import IUsersTokenResetRepository from '@modules/users/repositories/IUsersTokenResetRepository';
import UsersTokenResetRepository from '@modules/users/infra/typeorm/repositories/UsersTokenResetRepository';

container.registerSingleton<IProductsRepository>(
    'ProductsRepository',
    ProductsRepository
);

container.registerSingleton<IProductsContentRepository>(
    'ProductsContentRepository',
    ProductsContentRepository
);

container.registerSingleton<IProductsContentPhotoRepository>(
    'ProductsContentPhotoRepository',
    ProductsContentPhotoRepository
);

container.registerSingleton<IProductsContentTextRepository>(
    'ProductsContentTextRepository',
    ProductsContentTextRepository
);

container.registerSingleton<IProductsContentVideoRepository>(
    'ProductsContentVideoRepository',
    ProductsContentVideoRepository
);

container.registerSingleton<IProductsTagsRepository>(
    'ProductsTagsRepository',
    ProductsTagsRepository
);

container.registerSingleton<IProductsUserRepository>(
    'ProductsUserRepository',
    ProductsUserRepository
);

container.registerSingleton<IProductsUserNotificationsRepository>(
    'ProductsUserNotificationsRepository',
    ProductsUserNotificationsRepository
);

container.registerSingleton<ISelectedProductsUserNotificationsRepository>(
    'SelectedProductsUserNotificationsRepository',
    SelectedProductsUserNotificationsRepository
);

container.registerSingleton<IUsersRepository>(
    'UsersRepository',
    UsersRepository
);

container.registerSingleton<IUsersTokenRepository>(
    'UsersTokenRepository',
    UsersTokenRepository
);

container.registerSingleton<IUsersTokenResetRepository>(
    'UsersTokenResetRepository',
    UsersTokenResetRepository
);