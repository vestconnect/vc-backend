import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import { hash } from 'bcryptjs';
import AppError from '../../errors/AppError';
import User from '../../models/User';
import uploadConfig from '../../config/upload';

enum TypeUser {
    User,
    Brand,
    Admin
}

interface RequestCreateUser {
    name: string;
    email: string;
    password: string;
    birth: Date;
    type: TypeUser;
    nickname: string;
}

interface RequestUpdatePasswordUser {
    id: string;
    password: string;
}

interface RequestUpdateAvatarUser {
    id: string;
    avatar: string;
}

class UserServices {
    public async createUser({ name, email, password, birth, type, nickname }: RequestCreateUser): Promise<User> {
        const userRepository = getRepository(User);

        const checkUserEmailExists = await userRepository.findOne({
            where: { email },
            select: ['email']
        });

        if (checkUserEmailExists) {
            throw new AppError('E-mail já cadastrado', 401);
        }

        const hashedPassword = await hash(password, 8);

        const user = userRepository.create({
            name,
            email,
            password: hashedPassword,
            birth,
            type,
            nickname
        });

        await userRepository.save(user);

        return user;
    }

    public async updatePassword({ id, password }: RequestUpdatePasswordUser): Promise<User> {
        const userRepository = getRepository(User);

        const user = await userRepository.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'birth', 'avatar', 'created_at']
        });

        if (!user) {
            throw new AppError('Usuário inválido');
        }

        const hashedPassword = await hash(password, 8);

        user.password = hashedPassword;

        userRepository.save(user);

        return user;
    }

    public async updateAvatar({ id, avatar }: RequestUpdateAvatarUser): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({
            where: { id },
            select: ['id', 'name', 'email', 'birth', 'avatar', 'created_at']
        });

        if (!user) {
            throw new AppError('Usuário inválido', 401);
        }

        if (user.avatar) {
            const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
            const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatar;

        await usersRepository.save(user);

        return user;
    }
}

export default UserServices;