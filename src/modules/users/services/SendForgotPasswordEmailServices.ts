import { injectable, inject } from 'tsyringe';
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

        await this.usersTokenResetRepository.generate(user.id);
        await this.mailProvider.sendMail(email, 'Teste');
    }
}

export default SendForgotPasswordEmailServices;