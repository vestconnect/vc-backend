import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductTagNfcServices from '@modules/products/services/CreateProductTagNfcServices';
import SelectProductTagNfcServices from '@modules/products/services/SelectProductTagNfcServices';
import UpdateActiveProductsTagsNfcServices from '@modules/products/services/UpdateActiveProductsTagsNfcServices';

export default class ProductsTagsNfcController {
    public async index(request: Request, response: Response): Promise<Response> {
        const selectProductTagNfcServices = container.resolve(SelectProductTagNfcServices);
        const product_id = request.params.id;

        const productTag = await selectProductTagNfcServices.execute(product_id);

        return response.json(productTag);
    }

    public async execute(request: Request, response: Response): Promise<Response> {
        const createProductTagNfcServices = container.resolve(CreateProductTagNfcServices);
        const product_id = request.params.id;
        const file = request.file.filename;

        const productTag = await createProductTagNfcServices.execute({
            product_id,
            file
        });

        return response.json(productTag);
    }

    public async inactive(request: Request, response: Response): Promise<Response> {
        const updateActiveProductsTagsNfcServices = container.resolve(UpdateActiveProductsTagsNfcServices);
        const id = request.params.id;

        const productTag = await updateActiveProductsTagsNfcServices.execute(id);

        return response.json(productTag);
    }
}