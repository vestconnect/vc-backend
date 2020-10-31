import { Request, Response } from 'express';
import CreateProductUserServices from '@modules/products/services/CreateProductUserServices';
import SelectProductUserServices from '@modules/products/services/SelectProductUserServices';
import { container } from 'tsyringe';

export default class ProductsUserController {
    public async create(request: Request, response: Response): Promise<Response> {
        const createProductUserServices = container.resolve(CreateProductUserServices);
        const user_id = request.user.id;
        const { nfc_id } = request.body;

        const productUser = await createProductUserServices.execute({
            nfc_id,
            user_id
        });

        return response.json(productUser);
    }

    public async index(request: Request, response: Response): Promise<Response> {
        const selectProductUserServices = container.resolve(SelectProductUserServices);
        const user_id = request.user.id;

        const productsUser = await selectProductUserServices.execute(user_id);

        return response.json(productsUser);
    }
}