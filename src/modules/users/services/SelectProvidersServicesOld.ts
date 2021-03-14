import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';

interface IRequest {
    user_id: string;
    type: number;
}

@injectable()
class SelectProvidersServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ user_id, type }: IRequest): Promise<User[]> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado.');
        }

        if (user.type !== "2") {
            throw new AppError('Usuário não é admin');
        }

        const providers = await this.usersRepository.findByType(type);

        return classToClass(providers);
    }
}

export default SelectProvidersServices;