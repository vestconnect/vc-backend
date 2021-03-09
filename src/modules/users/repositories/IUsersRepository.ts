import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

export default interface IUsersRepository {
    countUsers(): Promise<number>;
    countProviders(): Promise<number>;
    find(): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findByType(type: number): Promise<User[]>;
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}