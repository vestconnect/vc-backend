import { Request, Response } from 'express';
import UpdateUserProviderServices from '@modules/users/services/UpdateUserProviderServices';
import { container } from 'tsyringe';

export default class UsersProviderController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserProviderServices = container.resolve(UpdateUserProviderServices);

    const user_id = request.params.id;
    const { name, nickname } = request.body;

    const user = await updateUserProviderServices.execute({
      user_id,
      name,
      nickname
    });

    return response.json(user);
  }
}