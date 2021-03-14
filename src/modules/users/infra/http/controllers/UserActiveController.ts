import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserActiveServices from '@modules/users/services/UpdateUserActiveServices';

export default class UserActiveController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserActiveServices = container.resolve(UpdateUserActiveServices);
    const user_id = request.params.id;

    await updateUserActiveServices.execute({ user_id });

    return response.status(204).json();
  }
}