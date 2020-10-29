import { Repository, getRepository } from 'typeorm';

import UserToken from '../entities/UserToken';
import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import ICreateUserTokenDTO from '@modules/users/dtos/ICreateUserTokenDTO';

class UsersTokenRepository implements IUsersTokenRepository {
    private ormRepository: Repository<UserToken>;

    constructor() {
        this.ormRepository = getRepository(UserToken);
    }

    public async findById(id: string): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne(id);

        return userToken;
    }

    public async findByToken(token: string): Promise<UserToken | undefined> {
        const userToken = await this.ormRepository.findOne({
            where: { token }
        });

        return userToken;
    }

    public async create(dataUserToken: ICreateUserTokenDTO): Promise<UserToken> {
        const userToken = this.ormRepository.create(dataUserToken);

        await this.ormRepository.save(userToken);

        return userToken;
    }
}

export default UsersTokenRepository;