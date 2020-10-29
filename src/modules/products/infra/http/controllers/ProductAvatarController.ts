import { Request, Response } from 'express';
import UpdateProductAvatarServices from '@modules/products/services/UpdateProductAvatarServices';
import { container } from 'tsyringe';

export default class ProductAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateProductAvatarServices = container.resolve(UpdateProductAvatarServices);

        const id = request.params.id;
        const user_id = request.user.id;
        const avatar = request.file.filename;

        const product = await updateProductAvatarServices.execute({ id, avatar, user_id });

        return response.json(product);
    }
}