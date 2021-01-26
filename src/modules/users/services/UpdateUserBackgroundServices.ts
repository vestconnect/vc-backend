import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';
import { classToClass } from 'class-transformer';

interface IRequest {
    id: string;
    background: string;
}

@injectable()
class UpdateUserBackgroundServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('StorageProvider')
        private storageProvider: IStorageProvider
    ) { }

    public async execute({ id, background }: IRequest): Promise<User> {
        const user = await this.usersRepository.findById(id);

        if (!user) {
            throw new AppError('Usuário inválido', 401);
        }

        if (user.background) {
            await this.storageProvider.deleteFile(user.background);
        }

        const fileName = await this.storageProvider.saveFile(background);

        user.background = fileName;

        await this.usersRepository.save(user);

        return classToClass(user);
    }
}

export default UpdateUserBackgroundServices;