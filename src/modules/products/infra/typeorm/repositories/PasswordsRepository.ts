import { Repository, getRepository } from 'typeorm';
import Password from '../entities/Password';
import IPasswordsRepository from '@modules/products/repositories/IPasswordsRepository';
import AppError from '@shared/errors/AppError';

class PasswordsRepository implements IPasswordsRepository {
    private ormRepository: Repository<Password>;

    constructor() {
        this.ormRepository = getRepository(Password);
    }

    public async find(user_id: string): Promise<Password[]> {
        const passwords = await this.ormRepository.find({
            where: { user_id }
        });

        return passwords;
    }

    public async findByPass(pass: string): Promise<Password | undefined> {
        const password = await this.ormRepository.findOne({
            where: { pass, active: true }
        });

        return password;
    }

    public async findActivePasswords(user_id: string): Promise<Password[]> {
        const passwords = await this.ormRepository.find({
            where: { active: true, user_id }
        });

        return passwords;
    }

    public async create(pass: string, user_id: string): Promise<Password> {
        const password = this.ormRepository.create({
            pass,
            user_id
        });

        await this.ormRepository.save(password);

        return password;
    }

    public async save(password: Password): Promise<Password> {
        return await this.ormRepository.save(password);
    }

    public async inactivePassword(id: string): Promise<Password> {
        const password = await this.ormRepository.findOne(id);

        if (!password) {
            throw new AppError('Password não encontrado', 400);
        }

        password.active = false;

        await this.ormRepository.save(password);

        return password;
    }

    public async inactiveByPass(pass: string): Promise<Password> {
        const password = await this.ormRepository.findOne({
            where: { pass, active: true }
        });

        if (!password) {
            throw new AppError('Password não encontrado', 400);
        }

        password.active = false;

        await this.ormRepository.save(password);

        return password;
    }

    public async inactiveAll(user_id: string): Promise<Password[]> {
        const password = await this.ormRepository.find({
            where: { user_id }
        });

        password.forEach(tag => {
            tag.active = false;
        });

        await this.ormRepository.save(password);

        return password;
    }
}

export default PasswordsRepository;