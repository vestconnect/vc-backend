import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import { isAfter, addHours } from 'date-fns';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokenResetRepository from '../repositories/IUsersTokenResetRepository';

interface IRequest {
    email: string;
    token: string;
}

@injectable()
class ConfirmEmailUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('UsersTokenResetRepository')
        private usersTokenResetRepository: IUsersTokenResetRepository
    ) { }

    public async execute({ email, token }: IRequest): Promise<void> {
        const userTokenReset = await this.usersTokenResetRepository.findByToken(token);        

        if (!userTokenReset) {
            throw new AppError('Token inválido', 400);
        }

        const user = await this.usersRepository.findById(userTokenReset.user_id);

        if (!user) {
            throw new AppError('Usuário não existe', 400);
        }

        if (user.email !== email) {
            throw new AppError('E-mail inválido.', 400);
        }

        const tokenCreatedAt = userTokenReset.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expirado', 401);
        }

        user.confirm_email = true;

        await this.usersRepository.save(user);
    }
}

export default ConfirmEmailUserServices;