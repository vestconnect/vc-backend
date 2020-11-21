import { Request, Response } from 'express';
import CreateUserTokenServices from '@modules/users/services/CreateUserTokenServices';
import { container } from 'tsyringe';

export default class UsersTokenController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createUserTokenServices = container.resolve(CreateUserTokenServices);

        const id = request.user.id;
        const { token } = request.body;

        await createUserTokenServices.execute({
            id,
            token
        });

        return response.status(204).json();
    }
}