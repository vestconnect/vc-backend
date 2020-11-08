import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateProductTagServices from '@modules/products/services/CreateProductTagServices';
import DeleteProductTagService from '@modules/products/services/DeleteProductTagService';

export default class ProductsTagsController {
    public async execute(request: Request, response: Response): Promise<Response> {
        const createProductTagServices = container.resolve(CreateProductTagServices);
        const { product_id, description } = request.body;

        const productTag = await createProductTagServices.create({
            product_id,
            description
        });

        return response.json(productTag);
    }

    public async delete(request: Request, response: Response): Promise<Response> {
        const deleteProductTagService = container.resolve(DeleteProductTagService);
        const id = request.params.id;

        await deleteProductTagService.delete({ id });

        return response.status(204).json();
    }
}