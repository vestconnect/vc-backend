import { Request, Response } from 'express';
import UpdateUserPasswordServices from '@modules/users/services/UpdateUserPasswordServices';
import { container } from 'tsyringe';

export default class UserPasswordController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserPasswordServices = container.resolve(UpdateUserPasswordServices);
        const { email, password } = request.body;
        const id = request.user.id;

        const user = await updateUserPasswordServices.execute({ id, password, email });

        return response.json(user);
    }
}