import { Request, Response } from 'express';
import UpdateProductContentVideoBackgroundServices from '@modules/products/services/UpdateProductContentVideoBackgroundServices';
import { container } from 'tsyringe';

export default class ProductContentVideoBackgroundController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateProductContentVideoBackgroundServices = container.resolve(UpdateProductContentVideoBackgroundServices);
        const id = request.params.id;
        const background = request.file.filename;

        const productContentVideo = await updateProductContentVideoBackgroundServices.execute({
            id,
            background
        });

        return response.json(productContentVideo);
    }
}