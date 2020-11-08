import { getRepository } from 'typeorm';
import { Router } from 'express';
import ProductTag from '../../typeorm/entities/ProductTag';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import ProductsTagsController from '../controllers/ProductsTagsController';

const productTagRouter = Router();
const productsTagsController = new ProductsTagsController();

productTagRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const productTagRepository = getRepository(ProductTag);
    const product_id = request.params.id;

    const productTag = await productTagRepository.find({
        where: { product_id }
    });

    response.json(productTag);
});
productTagRouter.post('/', ensureAuthenticated, productsTagsController.execute);
productTagRouter.delete('/:id', ensureAuthenticated, productsTagsController.delete);
export default productTagRouter;
