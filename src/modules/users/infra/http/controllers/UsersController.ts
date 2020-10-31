import { Request, Response } from 'express';
import CreateUserServices from '@modules/users/services/CreateUserServices';
import SendEmailConfirmEmailAddress from '@modules/users/services/SendEmailConfirmEmailAddress';
import { container } from 'tsyringe';

export default class UsersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const sendEmailServices = container.resolve(SendEmailConfirmEmailAddress);
        const { email } = request.body;

        await sendEmailServices.execute({ email });

        return response.status(204).json();
    }

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