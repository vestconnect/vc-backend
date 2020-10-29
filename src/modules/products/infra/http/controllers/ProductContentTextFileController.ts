import { Request, Response } from 'express';
import UpdateProductContentTextFileServices from '@modules/products/services/UpdateProductContentTextFileServices';
import { container } from 'tsyringe';

export default class ProductContentTextFileController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateProductContentTextFileServices = container.resolve(UpdateProductContentTextFileServices);
        const id = request.params.id;
        const file = request.file.filename;

        const productContentText = await updateProductContentTextFileServices.execute({
            id,
            file
        });

        return response.json(productContentText);
    }
}