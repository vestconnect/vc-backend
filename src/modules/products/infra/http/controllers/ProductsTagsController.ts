import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductTagServices from '@modules/products/services/CreateProductTagServices';

export default class ProductsTagsController {
    public async execute(request: Request, response: Response): Promise<Response> {
        const createProductTagServices = container.resolve(CreateProductTagServices);
        const { product_id, description } = request.body;

        const productTag = await createProductTagServices.create({
            product_id,
            description
        });

        return response.json(productTag);
    }
}