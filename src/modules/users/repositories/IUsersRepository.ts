import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

interface IReturnUsers {
    users: User[];
    total: number;
    total_pages: number;
}

export default interface IUsersRepository {
    countUsers(): Promise<number>;
    countProviders(): Promise<number>;
    find(): Promise<User[]>;
    findById(id: string): Promise<User | undefined>;
    findByEmail(email: string): Promise<User | undefined>;
    findByType(type: number): Promise<User[]>;
    findUsers(page: number): Promise<IReturnUsers>;
    findProviders(page: number): Promise<IReturnUsers>;
    findAdmins(page: number): Promise<IReturnUsers>;
    create(data: ICreateUserDTO): Promise<User>;
    save(user: User): Promise<User>;
}