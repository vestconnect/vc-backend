import { Request, Response } from 'express';
import SelectProviders from '@modules/users/services/SelectProvidersServices';
import SelectProvidersOld from '@modules/users/services/SelectProvidersServicesOld';
import { container } from 'tsyringe';

export default class ProvidersController {
    public async indexOld(request: Request, response: Response): Promise<Response> {
        const selectProvidersOld = container.resolve(SelectProvidersOld);
        const { type } = request.query;
        const user_id = request.user.id;

        const providers = await selectProvidersOld.execute({ user_id, type: Number(type) });

        return response.json(providers);
    }

    public async index(request: Request, response: Response): Promise<Response> {
        const selectProviders = container.resolve(SelectProviders);
        const { page } = request.query;
        const user_id = request.user.id;

        const providers = await selectProviders.execute({ user_id, page: Number(page) });

        return response.json(providers);
    }
}