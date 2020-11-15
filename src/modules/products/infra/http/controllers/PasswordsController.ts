import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreatePasswordServices from '@modules/products/services/CreatePasswordServices';
import SelectPasswordServices from '@modules/products/services/SelectPasswordServices';
import UpdateActivePasswordsServices from '@modules/products/services/UpdateActivePasswordsServices';
import UpdateActivePasswordsPassServices from '@modules/products/services/UpdateActivePasswordsPassServices';

export default class PasswordsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectPasswordServices = container.resolve(SelectPasswordServices);
        const user_id = request.user.id

        const productTag = await selectPasswordServices.execute(user_id);

        return response.json(productTag);
    }

    public async execute(request: Request, response: Response): Promise<Response> {
        const createPasswordServices = container.resolve(CreatePasswordServices);
        const user_id = request.user.id;
        const file = request.file.filename;

        const productTag = await createPasswordServices.execute({
            file,
            user_id
        });

        return response.json(productTag);
    }

    public async inactive(request: Request, response: Response): Promise<Response> {
        const updateActivePasswordsServices = container.resolve(UpdateActivePasswordsServices);
        const id = request.params.id;
        const user_id = request.user.id

        const productTag = await updateActivePasswordsServices.execute(id, user_id);

        return response.json(productTag);
    }

    public async inactivePass(request: Request, response: Response): Promise<Response> {
        const updateActivePasswordsPassServices = container.resolve(UpdateActivePasswordsPassServices);
        const id = request.params.id;

        const productTag = await updateActivePasswordsPassServices.execute(id);

        return response.json(productTag);
    }
}