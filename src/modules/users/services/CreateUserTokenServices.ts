import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import UserToken from '../infra/typeorm/entities/UserToken';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';
import IUsersRepository from '../repositories/IUsersRepository';

interface RequestUserToken {
    id: string;
    token: string;
}

@injectable()
class CreateUserTokenServices {
    constructor(
        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    public async execute({ id, token }: RequestUserToken): Promise<UserToken> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('Usuário não encontrado', 401);
        }

        if (!token) {
            throw new AppError('Token inválido', 401);
        }

        const userToken = await this.usersTokenRepository.create({
            token,
            user_id: id
        });

        return userToken;
    }
}

export default CreateUserTokenServices;