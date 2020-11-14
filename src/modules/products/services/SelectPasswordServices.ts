import { inject, injectable } from 'tsyringe';
import IPasswordsRepository from '../repositories/IPasswordsRepository';
import Password from '../infra/typeorm/entities/Password';

@injectable()
class SelectPasswordServices {
    constructor(
        @inject('PasswordsRepository')
        private passwordsRepository: IPasswordsRepository
    ) { }

    public async execute(user_id: string): Promise<Password[]> {
        const passwords = await this.passwordsRepository.find(user_id);

        return passwords;
    }
}

export default SelectPasswordServices;