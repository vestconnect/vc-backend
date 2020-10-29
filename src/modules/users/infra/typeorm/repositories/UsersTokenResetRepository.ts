import { Repository, getRepository } from 'typeorm';

import UserTokenReset from '../entities/UserTokenReset';
import IUsersTokenResetRepository from '@modules/users/repositories/IUsersTokenResetRepository';

class UsersTokenResetRepository implements IUsersTokenResetRepository {
    private ormRepository: Repository<UserTokenReset>;

    constructor() {
        this.ormRepository = getRepository(UserTokenReset);
    }

    public async findByToken(token: string): Promise<UserTokenReset | undefined> {
        const userTokenReset = await this.ormRepository.findOne({
            where: { token }
        });

        return userTokenReset;
    }

    public async generate(user_id: string): Promise<UserTokenReset> {
        const userTokenReset = this.ormRepository.create({
            user_id
        });

        await this.ormRepository.save(userTokenReset);

        return userTokenReset;
    }
}

export default UsersTokenResetRepository;