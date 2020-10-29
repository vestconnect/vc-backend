import { Request, Response } from 'express';
import UpdateUserAvatarServices from '@modules/users/services/UpdateUserAvatarServices';
import { container } from 'tsyringe';

export default class UserAvatarController {
    public async update(request: Request, response: Response): Promise<Response> {
        const updateUserAvatarServices = container.resolve(UpdateUserAvatarServices);

        const user = await updateUserAvatarServices.execute({
            id: request.user.id,
            avatar: request.file.filename
        });

        return response.json(user);
    }
}