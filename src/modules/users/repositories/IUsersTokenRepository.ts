import UserToken from '../infra/typeorm/entities/UserToken';
import ICreateUserToken from '../dtos/ICreateUserTokenDTO';

export default interface IUsersTokenRepository {
    findByToken(token: string): Promise<UserToken | undefined>;
    findById(id: string): Promise<UserToken | undefined>;
    create(data: ICreateUserToken): Promise<UserToken>;
}