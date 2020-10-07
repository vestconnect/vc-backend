import { getRepository } from 'typeorm';
import { Expo } from 'expo-server-sdk';
import AppError from '../../errors/AppError';

import User from '../../models/User';
import UserToken from '../../models/UserToken';

interface RequestUserToken {
    id: string;
    token: string;
}

class UserTokenServices {
    public async execute({ id, token }: RequestUserToken): Promise<UserToken> {
        const userRepository = getRepository(User);
        const user = await userRepository.findOne(id);

        if (!user) {
            throw new AppError('Usuário não encontrado', 401);
        }

        if (!token) {
            throw new AppError('Token inválido', 401);
        }

        if (!Expo.isExpoPushToken(token)) {
            throw new AppError('Token inválido', 500);
        }

        const userTokenRepository = getRepository(UserToken);

        const userToken = userTokenRepository.create({
            token,
            user_id: id
        });

        await userTokenRepository.save(userToken);

        return userToken;
    }
}

export default UserTokenServices;