import { inject, injectable } from 'tsyringe';
import ProductUserNotification from '../infra/typeorm/entities/ProductUserNotification';
import IProductsUserNotificationsRepository from '../repositories/IProductsUserNotificationsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';

@injectable()
class SelectProductUserNotifications {
  constructor(
    @inject('ProductsUserNotificationsRepository')
    private productsUserNotificationsRepository: IProductsUserNotificationsRepository,
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute(user_id: string): Promise<ProductUserNotification[]> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('Usuário não encontrado', 400);

    const notifications = await this.productsUserNotificationsRepository.findByUserId(user.id);

    return notifications;
  }
}

export default SelectProductUserNotifications;