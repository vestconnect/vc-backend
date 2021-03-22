import { Repository, getRepository } from 'typeorm';

import User from '../entities/User';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

interface IReturnUsers {
    users: User[];
    total: number;
    total_pages: number;
}

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async countUsers(): Promise<number> {
        const users = await this.ormRepository.count({
            where: { type: null }
        });

        return users;
    }

    public async countProviders(): Promise<number> {
        const providers = await this.ormRepository.count({
            where: { type: '1' }
        });

        return providers;
    }

    public async find(): Promise<User[]> {
        const users = await this.ormRepository.find();

        return users;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email }
        });

        return user;
    }

    public async findByType(type: number): Promise<User[]> {
        const users = await this.ormRepository.find({
            where: { type }
        });

        return users;
    }

    public async findProviders(page: number): Promise<IReturnUsers> {
        const skip = page > 1 ? (page - 1) * 10 : 0;

        const [providers, total] = await this.ormRepository.findAndCount({
            where: { type: '1' },
            skip,
            take: 10,
            order: { name: 'ASC' }
        });

        return {
            users: providers,
            total,
            total_pages: Math.ceil(total / 10)
        };
    }

    public async findUsers(page: number): Promise<IReturnUsers> {
        const skip = page > 1 ? (page - 1) * 10 : 0;

        const [users, total] = await this.ormRepository.findAndCount({
            where: { type: null },
            skip,
            take: 10,
            order: { name: 'ASC' }
        });

        return {
            users: users,
            total,
            total_pages: Math.ceil(total / 10)
        };
    }

    public async findAdmins(page: number): Promise<IReturnUsers> {
        const skip = page > 1 ? (page - 1) * 10 : 0;

        const [users, total] = await this.ormRepository.findAndCount({
            where: { type: '2' },
            skip,
            take: 10,
            order: { name: 'ASC' }
        });

        return {
            users: users,
            total,
            total_pages: Math.ceil(total / 10)
        };
    }

    public async create(dataUser: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(dataUser);

        await this.ormRepository.save(user);

        return user;
    }

    public async save(user: User): Promise<User> {
        return await this.ormRepository.save(user);
    }
}

export default UsersRepository;