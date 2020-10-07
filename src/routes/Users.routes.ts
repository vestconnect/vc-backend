import { getRepository, In } from 'typeorm';
import { Router } from 'express';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';

import multer from 'multer';
import AuthenticateUserServices from '../services/auth/AuthenticateUserServices';
import UserServices from '../services/User/UserServices';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';

import User from '../models/User';
import UserToken from '../models/UserToken';

const usersRouter = Router();
const upload = multer(uploadConfig);

let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

interface TokenProps {
    tokenId: string;
}

interface MessageProps extends ExpoPushMessage { }

usersRouter.get('/', async (request, response) => {
    const userRepository = getRepository(User);
    const userTokenRepository = getRepository(UserToken);

    const users = await userRepository.find({ select: ['id', 'name', 'email', 'birth', 'avatar', 'created_at'] });
    const usersId = users.map(user => { return user.id });

    const usersToken = await userTokenRepository.find({ where: { user_id: In(usersId) } });

    let tokens: TokenProps[] = [];
    let messages: MessageProps[] = [];

    if (usersToken.length) {
        tokens = usersToken.map(userToken => {
            return {
                tokenId: userToken.token
            }
        });

        for (let pushToken of tokens) {
            messages.push({
                to: pushToken.tokenId,
                sound: 'default',
                title: 'Temos um novo conteúdo Green Valey',
                body: 'Acesse sua carteira e visualize :D'
            });
        }

        const chunks = expo.chunkPushNotifications(messages);

        let tickets = [];

        for (let chunk of chunks) {
            try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);

                tickets.push(...ticketChunk);
            } catch (error) {
                console.error(error);
            }
        }
    }

    response.json(users);
});

usersRouter.post('/', async (request, response) => {
    const { name, email, password, birth } = request.body;
    const createUser = new UserServices();

    const user = await createUser.createUser({
        name,
        email,
        password,
        birth
    });

    const authenticateUser = new AuthenticateUserServices();

    const { token } = await authenticateUser.execute({ email, password });

    response.json({ user, token });
});

usersRouter.patch('/password', ensureAuthenticated, async (request, response) => {
    const id = request.user.id;
    const { password } = request.body;

    const updatePassword = new UserServices();

    const user = await updatePassword.updatePassword({ id, password });

    response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
    const updateUserAvatar = new UserServices();

    const user = await updateUserAvatar.updateAvatar({
        id: request.user.id,
        avatar: request.file.filename
    });

    return response.json(user);
});

export default usersRouter;