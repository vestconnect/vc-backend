import { Repository, getRepository } from 'typeorm';
import ProductUser from '../entities/ProductUser';
import ICreateProductUserDTO from '@modules/products/dtos/ICreateProductUserDTO';
import IProductsUserRepository from '@modules/products/repositories/IProductsUserRepository'

class ProductsUserRepository implements IProductsUserRepository {
    private ormRepository: Repository<ProductUser>

    constructor() {
        this.ormRepository = getRepository(ProductUser);
    }

    public async findById(id: string): Promise<ProductUser | undefined> {
        const productUser = await this.ormRepository.findOne(id);

        return productUser;
    }

    public async findByProductId(product_id: string, user_id: string): Promise<ProductUser | undefined> {
        const productUser = await this.ormRepository.findOne({
            where: { product_id, user_id }
        });

        return productUser;
    }

    public async findUsersByProduct(product_id: string, relations: string[]): Promise<ProductUser[]> {
        const productUser = await this.ormRepository.find({
            where: { product_id },
            relations
        });

        return productUser;
    }

    public async findByUser(user_id: string, relations: string[]): Promise<ProductUser[]> {
        const productUser = await this.ormRepository.find({
            where: { user_id },
            relations
        });

        return productUser;
    }

    public async create(dto: ICreateProductUserDTO): Promise<ProductUser | undefined> {
        const productUser = this.ormRepository.create(dto);

        await this.ormRepository.save(productUser);

        const productUserReturn = await this.ormRepository.findOne({
            where: { id: productUser.id },
            relations: ['product', 'product.user']
        });

        return productUserReturn;
    }

    public async save(productUser: ProductUser): Promise<ProductUser> {
        return await this.ormRepository.save(productUser);
    }
}
export default ProductsUserRepository;