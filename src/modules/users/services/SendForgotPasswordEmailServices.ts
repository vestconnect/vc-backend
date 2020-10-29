import { injectable, inject } from 'tsyringe';
import path from 'path';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersTokenResetRepository from '../repositories/IUsersTokenResetRepository';

interface IRequest {
    email: string;
}

@injectable()
class SendForgotPasswordEmailServices {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
        @inject('MailProvider')
        private mailProvider: IMailProvider,
        @inject('UsersTokenResetRepository')
        private usersTokenResetRepository: IUsersTokenResetRepository
    ) { }

    public async execute({ email }: IRequest): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            throw new AppError('E-mail não cadastrado', 401);
        }

        const forgotPasswordTemplate = path.resolve(__dirname, '..', 'views', 'forgot_password.hbs')
        const userTokenReset = await this.usersTokenResetRepository.generate(user.id);
        await this.mailProvider.sendMail({
            to: {
                name: user.name,
                email: user.email
            },
            subject: '[VestConnect] Recuperação de senha',
            templateData: {
                file: forgotPasswordTemplate,
                variables: {
                    name: user.name,
                    link: `http://localhost:3000/reset_password?token=${userTokenReset.token}`
                }
            }
        });
    }
}

export default SendForgotPasswordEmailServices;