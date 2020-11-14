import { Request, Response } from 'express';
import SendNotificationProductServices from '@modules/products/services/SendNotificationProductServices';
import { container } from 'tsyringe';

export default class ProductsContentController {
    public async create(request: Request, response: Response): Promise<Response> {
        const { product_id, message } = request.body;

        const sendNotificationProductServices = container.resolve(SendNotificationProductServices);

        await sendNotificationProductServices.execute({
            product_id,
            message
        });

        return response.status(204).json();
    }
}