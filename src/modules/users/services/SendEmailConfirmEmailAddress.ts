import path from 'path';
import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
import IUsersTokenResetRepository from '../repositories/IUsersTokenResetRepository';

interface IRequest {
    email: string
}

@injectable()
class SendEmailConfirmEmailAddress {
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
    }
}

export default SendEmailConfirmEmailAddress;