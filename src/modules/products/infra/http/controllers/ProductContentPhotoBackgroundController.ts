import { Request, Response } from 'express';
import UpdateProductContentPhotoBackgroundServices from '@modules/products/services/UpdateProductContentPhotoBackgroundServices';
import { container } from 'tsyringe';

export default class ProductContentPhotoBackgroundController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateProductContentPhotoBackgroundServices = container.resolve(UpdateProductContentPhotoBackgroundServices);
        const id = request.params.id;
        const background = request.file.filename;

        const productContentPhoto = await updateProductContentPhotoBackgroundServices.execute({
            id,
            background
        });

        return response.json(productContentPhoto);
    }
}