import { Request, Response } from 'express';
import SendNotificationProductServices from '@modules/products/services/SendNotificationProductServices';
import SelectProductUserNotifications from '@modules/products/services/SelectProductUserNotifications';
import { container } from 'tsyringe';

export default class ProductsContentController {
    public async index(request: Request, response: Response): Promise<Response> {
        console.log('index');

        const user_id = request.user.id;
        const selectProductUserNotifications = container.resolve(SelectProductUserNotifications);
        const notifications = await selectProductUserNotifications.execute(user_id);

        console.log('index');

        return response.json(notifications);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        console.log('create');

        const { product_id, message, url } = request.body;
        const sendNotificationProductServices = container.resolve(SendNotificationProductServices);

        console.log('create');

        await sendNotificationProductServices.execute({
            product_id,
            message,
            url
        });

        return response.status(204).json();
    }
}