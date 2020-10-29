import { Request, Response } from 'express';
import CreateProductContentVideoServices from '@modules/products/services/CreateProductContentVideoServices';
import { container } from 'tsyringe';

export default class ProductsContentVideoController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createProductContentVideoServices = container.resolve(CreateProductContentVideoServices);

        const { title, description, content_id } = request.body;

        const productContentVideo = await createProductContentVideoServices.execute({
            title,
            description,
            content_id
        });

        return response.json(productContentVideo);
    }
}