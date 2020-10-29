import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokenResetRepository from '../repositories/IUsersTokenResetRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
    password: string;
    token: string;
}

@injectable()
class ResetPasswordServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UsersTokenResetRepository')
        private usersTokenResetRepository: IUsersTokenResetRepository,
        @inject('HashProvider')
        private hashProvider: IHashProvider
    ) { }

    public async execute({ password, token }: IRequest): Promise<void> {
        const userTokenReset = await this.usersTokenResetRepository.findByToken(token);

        if (!userTokenReset) {
            throw new AppError('Token inválido');
        }

        const user = await this.usersRepository.findById(userTokenReset.user_id);

        if (!user) {
            throw new AppError('Usuário não existe');
        }

        const tokenCreatedAt = userTokenReset.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expirado', 401);
        }

        user.password = await this.hashProvider.generateHash(password);

        await this.usersRepository.save(user);
    }
}

export default ResetPasswordServices;