import { Request, Response } from 'express';
import SelectProviders from '@modules/users/services/SelectProvidersServices';
import { container } from 'tsyringe';

export default class ProvidersController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectProviders = container.resolve(SelectProviders);
        const { type } = request.query;
        const user_id = request.user.id;

        const providers = await selectProviders.execute({ user_id, type: String(type) });

        return response.json(providers);
    }
}