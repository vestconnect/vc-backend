import { Request, Response } from 'express';
import UpdateProductContentBackgroundServices from '@modules/products/services/UpdateProductContentBackgroundServices';
import { container } from 'tsyringe';

export default class ProductContentBackgroundController {
    public async update(request: Request, response: Response): Promise<Response> {
        const id = request.params.id;
        const user_id = request.user.id;
        const background = request.file.filename;

        const updateProductContentBackgroundServices = container.resolve(UpdateProductContentBackgroundServices);

        const productContent = await updateProductContentBackgroundServices.update({
            id,
            background,
            user_id
        });

        return response.json(productContent);
    }
}