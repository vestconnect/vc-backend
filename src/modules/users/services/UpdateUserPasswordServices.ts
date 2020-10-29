import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

interface IRequest {
    id: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }

    public async execute({ id, email, password }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('Usuário inválido');
        }

        if (password) {
            const hashedPassword = await this.hashProvider.generateHash(password);

            user.password = hashedPassword;
        }

        if (email) {
            user.email = email;
        }

        await this.usersRepository.save(user);

        return classToClass(user);
    }
}

export default CreateUserServices;