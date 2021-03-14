import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';

interface IRequest {
  user_id: string;
  name: string;
  nickname: string;
}

@injectable()
class UpdateUserProviderServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository
  ) { }

  public async execute({ user_id, name, nickname }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('Usuário não encontrado');

    user.name = name;
    user.nickname = nickname;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserProviderServices;