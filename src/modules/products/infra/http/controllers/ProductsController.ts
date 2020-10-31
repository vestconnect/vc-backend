import { Request, Response } from 'express';
import CreateProductServices from '@modules/products/services/CreateProductServices';
import CheckExistsProduct from '@modules/products/services/CheckExistsProduct';
import { container } from 'tsyringe';

export default class ProductsController {
    public async index(request: Request, response: Response): Promise<Response> {
        const nfc_id = request.params.nfc;
        const checkExistsProduct = container.resolve(CheckExistsProduct);

        const exists = await checkExistsProduct.execute({ nfc_id });

        return response.json({ exists });
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { nfc_id, title, subtitle, validate, description } = request.body;

        const createProductServices = container.resolve(CreateProductServices);

        const product = await createProductServices.execute({
            nfc_id,
            user_id,
            title,
            subtitle,
            validate,
            description
        });

        return response.json(product);
    }
}