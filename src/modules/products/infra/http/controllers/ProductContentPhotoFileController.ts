import { Request, Response } from 'express';
import UpdateProductContentPhotoFileServices from '@modules/products/services/UpdateProductContentPhotoFileServices';
import { container } from 'tsyringe';

export default class ProductContentPhotoFileController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateProductContentPhotoFileServices = container.resolve(UpdateProductContentPhotoFileServices);
        const id = request.params.id;
        const file = request.file.filename;

        const productContentPhoto = await updateProductContentPhotoFileServices.execute({
            id,
            file
        });

        return response.json(productContentPhoto);
    }
}