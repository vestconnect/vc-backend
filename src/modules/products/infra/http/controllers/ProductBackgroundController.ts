import { Request, Response } from 'express';
import UpdateProductBackgroundServices from '@modules/products/services/UpdateProductBackgroundServices';
import { container } from 'tsyringe';

export default class ProductBackgroundController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateProductBackgroundServices = container.resolve(UpdateProductBackgroundServices);

        const id = request.params.id;
        const user_id = request.user.id;
        const background = request.file.filename;

        const product = await updateProductBackgroundServices.execute({ id, background, user_id });

        return response.json(product);
    }
}