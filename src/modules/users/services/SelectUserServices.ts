import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';

interface IRequest {
  user_id: string;
  page: number;
  admin?: boolean;
}

interface IResponse {
  total: number;
  total_pages: number;
  users: User[];
}

@injectable()
class SelectUserServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute({ user_id, page, admin }: IRequest): Promise<IResponse> {
    const userAdmin = await this.usersRepository.findById(user_id);

    if (!userAdmin) throw new AppError('Usuário não encontrado');
    if (userAdmin.type !== '2') throw new AppError('Usuário não é administrador');

    const users = admin
      ? await this.usersRepository.findAdmins(page)
      : await this.usersRepository.findUsers(page);

    return classToClass(users);
  }
}

export default SelectUserServices;