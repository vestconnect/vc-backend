import { injectable, inject } from 'tsyringe';
import { sign } from 'jsonwebtoken';

import User from '../infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import jwtConfig from '@config/auth';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string
}

@injectable()
class AuthenticateUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }

    public async execute({ email, password }: Request): Promise<Response> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('E-mail ou senha incorreto', 200);
        }

        const passwordMatched = await this.hashProvider.compareHash(password, user.password);

        if (!passwordMatched) {
            throw new AppError('E-mail ou senha incorreto!', 200);
        }

        const { secret, expiresIn } = jwtConfig.jwt;

        const token = sign({}, secret, {
            subject: user.id,
            expiresIn
        });

        return {
            user,
            token
        }
    }
}

export default AuthenticateUserServices;