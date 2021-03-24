import { Repository, getRepository } from "typeorm";
import ProductUserNotification from "../entities/ProductUserNotification";
import ICreateProductUserNotificationDTO from "@modules/products/dtos/ICreateProductUserNotificationDTO";
import ICountNotReadProductUserNotificationsDTO from "@modules/products/dtos/ICountNotReadProductUserNotificationsDTO";
import IProductsUserNotificationsRepository from "@modules/products/repositories/IProductsUserNotificationsRepository";

class ProductsUserNotificationsRepository
  implements IProductsUserNotificationsRepository {
  private ormRepository: Repository<ProductUserNotification>;

  constructor() {
    this.ormRepository = getRepository(ProductUserNotification);
  }

  public async findById(
    id: string
  ): Promise<ProductUserNotification | undefined> {
    const productUserNotification = await this.ormRepository.findOne(id);

    return productUserNotification;
  }

  public async findByUserId(
    user_id: string
  ): Promise<ProductUserNotification[]> {
    const productUserNotification = await this.ormRepository.find({
      where: { user_id },
    });

    return productUserNotification;
  }

  public async findByProduct(
    product_id: string
  ): Promise<ProductUserNotification | undefined> {
    const productUserNotification = await this.ormRepository.findOne({
      where: { product_id },
    });

    return productUserNotification;
  }

  public async create(
    dto: ICreateProductUserNotificationDTO
  ): Promise<ProductUserNotification> {
    const productUserNotification = this.ormRepository.create(dto);

    await this.ormRepository.save(productUserNotification);

    return productUserNotification;
  }

  public async save(
    productUserNotification: ProductUserNotification
  ): Promise<ProductUserNotification> {
    return await this.ormRepository.save(productUserNotification);
  }

  public async countNotReadNotifications({
    product_id,
    user_id,
  }: ICountNotReadProductUserNotificationsDTO): Promise<number> {
    return await this.ormRepository.count({
      where: { read: false, user_id, product_id },
    });
  }

  public async countNotReadNotificationsByUser(
    user_id: string
  ): Promise<ProductUserNotification[]> {
    return await this.ormRepository.find({
      where: { read: false, user_id },
    });
  }

  public async readAllNotification(user_id: string): Promise<void> {
    const notifications = await this.ormRepository.find({
      where: { user_id, read: false },
    });

    notifications.forEach((notification) => {
      notification.read = true;
    });

    await this.ormRepository.save(notifications);
  }

  public async deleteByProductId(product_id: string): Promise<void> {
    await this.ormRepository.delete({ product_id });
  }
}

export default ProductsUserNotificationsRepository;
