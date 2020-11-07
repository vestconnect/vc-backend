import { Request, Response } from 'express';
import CreateProductUserServices from '@modules/products/services/CreateProductUserServices';
import SelectProductUserServices from '@modules/products/services/SelectProductUserServices';
import SelectUserProductsService from '@modules/products/services/SelectUserProductsService';
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

    public async show(request: Request, response: Response): Promise<Response> {
        const selectUserProductService = container.resolve(SelectUserProductsService);
        const product_id = request.params.id;

        const users = await selectUserProductService.execute({ id: product_id });

        return response.json(users);
    }
}