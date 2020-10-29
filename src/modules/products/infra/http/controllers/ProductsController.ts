import { Request, Response } from 'express';
import CreateProductServices from '@modules/products/services/CreateProductServices';
import { container } from 'tsyringe';

export default class ProductsController {
    public async create(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { nfc_id, title, subtitle, validate, description } = request.body;

        const createProductServices = container.resolve(CreateProductServices);

        const product = await createProductServices.execute({
            nfc_id,
            user_id,
            title,
            subtitle,
            validate,
            description
        });

        return response.json(product);
    }
}