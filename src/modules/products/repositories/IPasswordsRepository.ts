import Password from '../infra/typeorm/entities/Password';

export default interface IPasswordsRepository {
    find(user_id: string): Promise<Password[]>;
    findActivePasswords(user_id: string): Promise<Password[]>;
    create(pass: string, user_id: string): Promise<Password>;
    save(Password: Password): Promise<Password>;
    inactivePassword(id: string): Promise<Password>;
    inactiveAll(user_id: string): Promise<Password[]>;
}