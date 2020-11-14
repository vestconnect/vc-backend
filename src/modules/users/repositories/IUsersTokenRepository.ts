import UserToken from '../infra/typeorm/entities/UserToken';
import ICreateUserToken from '../dtos/ICreateUserTokenDTO';

export default interface IUsersTokenRepository {
    find(): Promise<UserToken[]>;
    findByToken(token: string): Promise<UserToken | undefined>;
    findById(id: string): Promise<UserToken | undefined>;
    findByUserId(user_id: string): Promise<UserToken[]>;
    create(data: ICreateUserToken): Promise<UserToken>;
}