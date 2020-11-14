import { inject, injectable } from 'tsyringe';
import IPasswordsRepository from '../repositories/IPasswordsRepository';
import Password from '../infra/typeorm/entities/Password';
import { String } from 'aws-sdk/clients/cloudhsm';

@injectable()
class UpdateActivePasswordsServices {
    constructor(
        @inject('PasswordsRepository')
        private passwordsRepository: IPasswordsRepository
    ) { }

    public async execute(id: string, user_id: String): Promise<Password | Password[]> {
        let password;

        if (id) {
            password = await this.passwordsRepository.inactivePassword(id);

            return password;
        }

        password = await this.passwordsRepository.inactiveAll(user_id);

        return password;
    }
}

export default UpdateActivePasswordsServices;