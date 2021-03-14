import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import { classToClass } from 'class-transformer';

interface IRequest {
    user_id: string;
    page: number;
}

interface IReturnUsers {
    users: User[];
    total: number;
    total_pages: number;
}

@injectable()
class SelectProvidersServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ user_id, page }: IRequest): Promise<IReturnUsers> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('Usuário não encontrado.');
        }

        if (user.type !== "2") {
            throw new AppError('Usuário não é admin');
        }

        const providers = await this.usersRepository.findProviders(page);

        return classToClass(providers);
    }
}

export default SelectProvidersServices;