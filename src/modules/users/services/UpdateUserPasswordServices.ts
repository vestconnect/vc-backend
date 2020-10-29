import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import { hash } from 'bcryptjs';
import User from '../infra/typeorm/entities/User';

interface IRequest {
    id: string;
    email: string;
    password: string;
}

@injectable()
class CreateUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ id, email, password }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('Usuário inválido');
        }

        if (password) {
            const hashedPassword = await hash(password, 8);

            user.password = hashedPassword;
        }

        if (email) {
            user.email = email;
        }

        await this.usersRepository.save(user);

        return user;
    }
}

export default CreateUserServices;