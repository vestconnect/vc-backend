import { getRepository } from 'typeorm';
import { Router } from 'express';
import ProductTag from '../models/ProductTag';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const productTagRouter = Router();

productTagRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const productTagRepository = getRepository(ProductTag);
    const product_id = request.params.id;

    const productTag = await productTagRepository.find({
        where: { product_id }
    });

    response.json(productTag);
});

productTagRouter.post('/', ensureAuthenticated, async (request, response) => {
    const productTagRepository = getRepository(ProductTag);
    const { product_id, description } = request.body;

    const productTag = productTagRepository.create({
        product_id,
        description
    });

    await productTagRepository.save(productTag);

    response.json(productTag);
});

export default productTagRouter;
