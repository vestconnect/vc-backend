import { inject, injectable } from 'tsyringe';
import IPasswordsRepository from '../repositories/IPasswordsRepository';
import Password from '../infra/typeorm/entities/Password';
import AppError from '@shared/errors/AppError';

@injectable()
class UpdateActivePasswordsServices {
    constructor(
        @inject('PasswordsRepository')
        private passwordsRepository: IPasswordsRepository
    ) { }

    public async execute(id: string): Promise<Password> {
        const pass = await this.passwordsRepository.findByPass(id);

        if (!pass) {
            throw new AppError('Password inválido.', 400);
        }

        if (!pass.active) {
            throw new AppError('Password já utilizado.', 400);
        }

        const password = await this.passwordsRepository.inactiveByPass(id);

        return password;
    }
}

export default UpdateActivePasswordsServices;