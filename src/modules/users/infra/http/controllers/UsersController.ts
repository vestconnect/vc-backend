import { Request, Response } from 'express';
import CreateUserServices from '@modules/users/services/CreateUserServices';
import { container } from 'tsyringe';

export default class UsersController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createUserServices = container.resolve(CreateUserServices);

        const { name, email, password, birth, type, nickname } = request.body;

        const user = await createUserServices.execute({
            name,
            email,
            password,
            birth,
            type,
            nickname
        });

        return response.json(user);
    }
}