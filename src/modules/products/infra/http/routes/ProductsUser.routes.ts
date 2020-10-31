import { getRepository } from 'typeorm';
import { Router } from 'express';
import SelectedProductUserNotification from '../../typeorm/entities/SelectedProductUserNotification';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsUserController from '../controllers/ProductsUserController';

const productsUserRouter = Router();
const productsUserController = new ProductsUserController();

productsUserRouter.get('/', ensureAuthenticated, productsUserController.index);
productsUserRouter.post('/', ensureAuthenticated, productsUserController.create);
productsUserRouter.post('/notifications', ensureAuthenticated, async (request, response) => {
    const { products } = request.body;
    const selectedProductUserNotificationRepository = getRepository(SelectedProductUserNotification);
    const user_id = request.user.id;

    await selectedProductUserNotificationRepository.delete({
        user_id
    });

    async function saveNotification() {
        for (const prd of products) {
            const productNotification = selectedProductUserNotificationRepository.create({
                product_id: prd.product_id,
                user_id
            });

            await selectedProductUserNotificationRepository.save(productNotification);
        }
    }

    await saveNotification();

    response.json(products);
});

export default productsUserRouter;