import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

enum TypeUser {
    User,
    Brand,
    Admin
}

interface IRequestCreateUser {
    name: string;
    email: string;
    password: string;
    birth: Date;
    type: TypeUser;
    nickname: string;
}

@injectable()
class CreateUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }

    public async execute({ name, email, password, birth, type, nickname }: IRequestCreateUser): Promise<User> {
        const checkUserEmailExists = await this.usersRepository.findByEmail(email);

        if (checkUserEmailExists) {
            throw new AppError('E-mail já cadastrado', 401);
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            birth,
            type,
            nickname
        });

        return user;
    }
}

export default CreateUserServices;