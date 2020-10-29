import SelectedProductUserNotification from '../infra/typeorm/entities/SelectedProductUserNotification';
import ICreateSelectedProductUserNotificationDTO from '../dtos/ICreateSelectedProductUserNotificationDTO';
import IFindAllSelectedProductUserNotificationDTO from '../dtos/IFindAllSelectedProductUserNotificationDTO';

export default interface ISelectedProductsUserNotificationsRepository {
    findById(id: string): Promise<SelectedProductUserNotification | undefined>;
    findByProduct(product_id: string): Promise<SelectedProductUserNotification | undefined>;
    findByUser(user_id: string): Promise<SelectedProductUserNotification | undefined>;
    findAlls(user_id: string, products: string[]): Promise<SelectedProductUserNotification[]>
    findAll(dto: IFindAllSelectedProductUserNotificationDTO): Promise<SelectedProductUserNotification[]>
    create(dto: ICreateSelectedProductUserNotificationDTO): Promise<SelectedProductUserNotification>;
    save(selectedProductUserNotification: SelectedProductUserNotification): Promise<SelectedProductUserNotification>
}