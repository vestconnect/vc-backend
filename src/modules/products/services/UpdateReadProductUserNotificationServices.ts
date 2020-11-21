import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { inject, injectable } from 'tsyringe';
import IProductsUserNotificationsRepository from '../repositories/IProductsUserNotificationsRepository';

@injectable()
class UpdateReadProductUserNotificationServices {
    constructor(
        @inject('ProductsUserNotificationsRepository')
        private productsUserNotificationsRepository: IProductsUserNotificationsRepository,
        @inject('CacheProvider')
        private cacheProvider: ICacheProvider
    ) { }

    public async execute(user_id: string): Promise<void> {
        await this.productsUserNotificationsRepository.readAllNotification(user_id);
        await this.cacheProvider.invalidate(`productuser-list:${user_id}`);
    }
}

export default UpdateReadProductUserNotificationServices;