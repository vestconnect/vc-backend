import { Request, Response } from 'express';
import CreateUserServices from '@modules/users/services/CreateUserServices';
import SendEmailConfirmEmailAddress from '@modules/users/services/SendEmailConfirmEmailAddress';
import SelectUserServices from '@modules/users/services/SelectUserServices';
import { container } from 'tsyringe';

export default class UsersController {
    public async indexRegisters(request: Request, response: Response): Promise<Response> {
        const selectUserServices = container.resolve(SelectUserServices);
        const { page } = request.query;
        const user_id = request.user.id;

        const users = await selectUserServices.execute({ user_id, page: Number(page), admin: request.path === '/admin' });

        return response.json(users);
    }

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