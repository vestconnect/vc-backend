import { Request, Response } from 'express';
import CreateProductContentServices from '@modules/products/services/CreateProductContentServices';
import { container } from 'tsyringe';

export default class ProductsContentController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { description, type, product_id } = request.body;

        const createProductContentServices = container.resolve(CreateProductContentServices);

        const product = await createProductContentServices.execute({
            description,
            product_id,
            type
        });

        return response.json(product);
    }
}