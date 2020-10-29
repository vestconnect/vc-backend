import { Repository, getRepository, In } from 'typeorm';
import SelectedProductUserNotification from '../entities/SelectedProductUserNotification';
import ICreateSelectedProductUserNotificationDTO from '@modules/products/dtos/ICreateSelectedProductUserNotificationDTO';
import IFindAllSelectedProductUserNotificationDTO from '@modules/products/dtos/IFindAllSelectedProductUserNotificationDTO';
import ISelectedProductsUserNotificationsRepository from '@modules/products/repositories/ISelectedProductsUserNotificationsRepository';

class SelectedProductsUserNotificationsRepository implements ISelectedProductsUserNotificationsRepository {
    private ormRepository: Repository<SelectedProductUserNotification>

    constructor() {
        this.ormRepository = getRepository(SelectedProductUserNotification);
    }

    public async findById(id: string): Promise<SelectedProductUserNotification | undefined> {
        const selectedProductUserNotification = await this.ormRepository.findOne(id);

        return selectedProductUserNotification;
    }

    public async findByProduct(product_id: string): Promise<SelectedProductUserNotification | undefined> {
        const selectedProductUserNotification = await this.ormRepository.findOne({
            where: { product_id }
        });

        return selectedProductUserNotification;
    }

    public async findByUser(user_id: string): Promise<SelectedProductUserNotification | undefined> {
        const selectedProductUserNotification = await this.ormRepository.findOne({
            where: { user_id }
        });

        return selectedProductUserNotification;
    }

    public async findAll({ user_id, product_id }: IFindAllSelectedProductUserNotificationDTO): Promise<SelectedProductUserNotification[]> {
        const selectedProductUserNotification = this.ormRepository.find({
            where: {
                user_id,
                product_id
            }
        });

        return selectedProductUserNotification;
    }

    public async findAlls(user_id: string, products: string[]): Promise<SelectedProductUserNotification[]> {
        const selectedProductUserNotification = this.ormRepository.find({
            where: {
                user_id,
                product_id: In(products)
            }
        });

        return selectedProductUserNotification;
    }

    public async create(dto: ICreateSelectedProductUserNotificationDTO): Promise<SelectedProductUserNotification> {
        const selectedProductUserNotification = this.ormRepository.create(dto);

        await this.ormRepository.save(selectedProductUserNotification);

        return selectedProductUserNotification;
    }

    public async save(selectedProductUserNotification: SelectedProductUserNotification): Promise<SelectedProductUserNotification> {
        return await this.ormRepository.save(selectedProductUserNotification);
    }
}

export default SelectedProductsUserNotificationsRepository;