import { Request, Response } from 'express';
import UpdateProductContentTextBackgroundServices from '@modules/products/services/UpdateProductContentTextBackgroundServices';
import { container } from 'tsyringe';

export default class ProductContentTextBackgroundController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateProductContentTextBackgroundServices = container.resolve(UpdateProductContentTextBackgroundServices);
        const id = request.params.id;
        const background = request.file.filename;

        const productContentText = await updateProductContentTextBackgroundServices.execute({
            id,
            background
        });

        return response.json(productContentText);
    }
}