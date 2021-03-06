import ProductUserNotification from "../infra/typeorm/entities/ProductUserNotification";
import ICreateProductUserNotificationDTO from "../dtos/ICreateProductUserNotificationDTO";
import ICountNotReadProductUserNotificationsDTO from "../dtos/ICountNotReadProductUserNotificationsDTO";

export default interface IProductsUserNotificationsRepository {
  findById(id: string): Promise<ProductUserNotification | undefined>;
  findByProduct(
    product_id: string
  ): Promise<ProductUserNotification | undefined>;
  create(
    dto: ICreateProductUserNotificationDTO
  ): Promise<ProductUserNotification>;
  save(
    productUserNotification: ProductUserNotification
  ): Promise<ProductUserNotification>;
  countNotReadNotifications(
    dto: ICountNotReadProductUserNotificationsDTO
  ): Promise<number>;
  countNotReadNotificationsByUser(
    user_id: string
  ): Promise<ProductUserNotification[]>;
  readAllNotification(user_id: string): Promise<void>;
  deleteByProductId(product_id: string): Promise<void>;
}
