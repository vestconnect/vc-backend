import { Request, Response } from 'express';
import CreateProductContentPhotoServices from '@modules/products/services/CreateProductContentPhotoServices';
import { container } from 'tsyringe';

export default class ProductsContentPhotoController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createProductContentPhotoServices = container.resolve(CreateProductContentPhotoServices);

        const { title, description, content_id } = request.body;

        const productContentPhoto = await createProductContentPhotoServices.execute({
            title,
            description,
            content_id
        });

        return response.json(productContentPhoto);
    }
}