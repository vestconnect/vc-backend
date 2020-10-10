import { getRepository, In } from 'typeorm';
import { Router } from 'express';
import ProductUserServices from '../services/ProductUser/ProductUserServices';
import ProductUser from '../models/ProductUser';
import ProductTag from '../models/ProductTag';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productsUserRouter = Router();

productsUserRouter.get('/', ensureAuthenticated, async (request, response) => {
    const productUserRepository = getRepository(ProductUser);
    const productTagRepository = getRepository(ProductTag);
    const user_id = request.user.id;

    const productUser = await productUserRepository.find({
        where: { user_id },
        relations: ['product', 'product.user']
    });

    const productTags = await productTagRepository.find({
        where: { product_id: In(productUser.map(product => product.product_id)) }
    })

    const responseProductUser = productUser.map(product => {
        return {
            id: product.id,
            product_id: product.product_id,
            product: {
                title: product.product.title,
                subtitle: product.product.subtitle,
                nfc_id: product.product.nfc_id,
                validate: product.product.validate,
                avatar: product.product.avatar,
                background: product.product.background,
                description: product.product.description,
                user: {
                    nickname: product.product.user.nickname,
                    avatar: product.product.user.avatar
                }
            },
            tag: productTags.filter(tag => tag.product_id === product.product_id)
        }
    })

    response.json(responseProductUser);
});

productsUserRouter.post('/', ensureAuthenticated, async (request, response) => {
    const productUserServices = new ProductUserServices();
    const user_id = request.user.id;
    const { nfc_id } = request.body;

    const productUser = await productUserServices.execute({
        nfc_id,
        user_id
    });

    response.json(productUser);
});

export default productsUserRouter;