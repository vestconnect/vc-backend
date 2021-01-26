import { Request, Response } from 'express';
import UpdateUserBackgroundServices from '@modules/users/services/UpdateUserBackgroundServices';
import { container } from 'tsyringe';

export default class UserBackgroundController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserBackgroundServices = container.resolve(UpdateUserBackgroundServices);

        const user = await updateUserBackgroundServices.execute({
            id: request.user.id,
            background: request.file.filename
        });

        return response.json(user);
    }

    public async updateProvider(request: Request, response: Response): Promise<Response> {
        const updateUserBackgroundServices = container.resolve(UpdateUserBackgroundServices);
        const id = request.params.id;

        const user = await updateUserBackgroundServices.execute({
            id,
            background: request.file.filename
        });

        return response.json(user);
    }
}