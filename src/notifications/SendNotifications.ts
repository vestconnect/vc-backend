import { getRepository, In } from 'typeorm';
import { Expo, ExpoPushMessage } from 'expo-server-sdk';
import ProductContent from '../models/ProductContent';
import ProductUser from '../models/ProductUser';
import Product from '../models/Product';
import UserToken from '../models/UserToken';
import AppError from '../errors/AppError';

interface SendNotificationsRequest {
    content_id: string;
}

interface TokenProps {
    tokenId: string;
}

interface MessageProps extends ExpoPushMessage { }

let expo = new Expo({ accessToken: process.env.EXPO_ACCESS_TOKEN });

class SendNotification {
    public async execute({ content_id }: SendNotificationsRequest): Promise<void> {
        const productContentRepository = getRepository(ProductContent);
        const productUserRepository = getRepository(ProductUser);
        const productRepository = getRepository(Product);
        const userTokenRepository = getRepository(UserToken);

        let tokens: TokenProps[] = [];
        let messages: MessageProps[] = [];

        const productContent = await productContentRepository.findOne({
            where: { id: content_id }
        });

        if (!productContent) {
            throw new AppError('Conteúdo não encontrado', 401);
        }

        const productUser = await productUserRepository.find({
            where: { product_id: productContent.product_id }
        });

        const usersId = productUser.map(user => { return user.user_id });

        const usersToken = await userTokenRepository.find({
            where: { user_id: In(usersId) }
        });

        const product = await productRepository.findOne({
            where: { id: productContent.product_id },
            relations: ['user']
        });

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
                    title: `${product?.user.nickname} publicou um novo conteúdo`,
                    body: `Acesse o produto ${product?.title} e visualize`
                });
            }

            const chunks = expo.chunkPushNotifications(messages);

            for (let chunk of chunks) {
                try {
                    await expo.sendPushNotificationsAsync(chunk);
                } catch (error) {
                    throw new AppError(error, 500);
                }
            }


        }
    }
}

export default SendNotification;