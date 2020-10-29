import { Request, Response } from 'express';
import CreateProductContentTextServices from '@modules/products/services/CreateProductContentTextServices';
import { container } from 'tsyringe';

export default class ProductsContentTextController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createProductContentTextServices = container.resolve(CreateProductContentTextServices);

        const { title, description, content_id } = request.body;

        const productContentText = await createProductContentTextServices.execute({
            title,
            description,
            content_id
        });

        return response.json(productContentText);
    }
}