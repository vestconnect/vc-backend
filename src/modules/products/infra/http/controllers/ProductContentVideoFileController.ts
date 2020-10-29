import { Request, Response } from 'express';
import UpdateProductContentVideoFileServices from '@modules/products/services/UpdateProductContentVideoFileServices';
import { container } from 'tsyringe';

export default class ProductContentVideoFileController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateProductContentVideoFileServices = container.resolve(UpdateProductContentVideoFileServices);
        const id = request.params.id;
        const file = request.file.filename;

        const productContentVideo = await updateProductContentVideoFileServices.execute({
            id,
            file
        });

        return response.json(productContentVideo);
    }
}