import { getRepository } from 'typeorm';
import AppError from '../../errors/AppError';
import User from '../../models/User';
import UserTokenReset from '../../models/UserTokenReset';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';

interface Request {
    token: string;
    password: string;
}

class ResetUserPassword {
    public async execute({ token, password }: Request): Promise<void> {
        const userTokenResetRepository = getRepository(UserTokenReset);
        const userRepository = getRepository(User);

        const userTokenReset = await userTokenResetRepository.findOne({
            where: { token }
        });

        if (!userTokenReset) {
            throw new AppError('Erro ao buscar token do usuário', 401);
        }

        const user = await userRepository.findOne({ where: { id: userTokenReset.user_id } });

        if (!user) {
            throw new AppError('Usuário não existe', 401);
        }

        const tokenCreatedAt = userTokenReset.created_at;
        const compareDate = addHours(tokenCreatedAt, 2);

        if (isAfter(Date.now(), compareDate)) {
            throw new AppError('Token expirado', 401);
        }

        const hashedPassword = await hash(password, 8);

        user.password = hashedPassword;

        await userRepository.save(user);
    }
}

export default ResetUserPassword;