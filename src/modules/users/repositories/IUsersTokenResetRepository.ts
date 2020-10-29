import UserTokenReset from '../infra/typeorm/entities/UserTokenReset';

export default interface IUsersTokenResetRepository {
    generate(user_id: string): Promise<UserTokenReset>;
    findByToken(token: string): Promise<UserTokenReset | undefined>;
}