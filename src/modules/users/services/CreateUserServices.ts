import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersTokenResetRepository from '../repositories/IUsersTokenResetRepository';
import { classToClass } from 'class-transformer';
import path from 'path';
import { parseISO } from 'date-fns';

interface IRequestCreateUser {
    name: string;
    email: string;
    password: string;
    birth?: string;
    type: string;
    nickname: string;
}

@injectable()
class CreateUserServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,

        @inject('HashProvider')
        private hashProvider: IHashProvider,

        @inject('MailProvider')
        private mailProvider: IMailProvider,

        @inject('UsersTokenResetRepository')
        private usersTokenResetRepository: IUsersTokenResetRepository
    ) { }

    public async execute({ name, email, password, birth, type, nickname }: IRequestCreateUser): Promise<User> {
        const checkUserEmailExists = await this.usersRepository.findByEmail(email);

        if (checkUserEmailExists) {
            throw new AppError('E-mail já cadastrado', 401);
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const user = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
            type,
            nickname
        });

        if (birth) {
            const splitBirth = birth.split('/');
            const month = Number(splitBirth[1]);
            const stringMonth = String(month).padStart(2, '0');
            const parsedBirth = parseISO(`${splitBirth[2]}-${stringMonth}-${splitBirth[0]}T00:00:00`);

            user.birth = parsedBirth;

            await this.usersRepository.save(user);
        }

        const confirmEmailTemplate = path.resolve(__dirname, '..', 'views', 'confirm_email.hbs');
        const userTokenReset = await this.usersTokenResetRepository.generate(user.id);

        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[VestConnect] Confirmação de e-mail',
            templateData: {
                file: confirmEmailTemplate,
                variables: {
                    name: user.name,
                    link: `${process.env.APP_WEB_URL}/confirm_email?token=${userTokenReset.token}&email=${user.email}`
                }
            }
        });

        return classToClass(user);
    }
}

export default CreateUserServices;