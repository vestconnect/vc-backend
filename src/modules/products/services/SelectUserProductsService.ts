import { inject, injectable } from 'tsyringe';
import IProductsUserRepository from '@modules/products/repositories/IProductsUserRepository';

interface IResponse {
    id: string;
    name: string;
    avatar_url: string | null;
}

interface IRequest {
    id: string;
}

@injectable()
class SelectUserProductServices {
    constructor(
        @inject('ProductsUserRepository')
        private productsUserRepository: IProductsUserRepository,
    ) { }

    public async execute({ id }: IRequest): Promise<IResponse[]> {
        const users = await this.productsUserRepository.findUsersByProduct(id, ['user']);

        const response: IResponse[] = users.map(user => {
            return {
                id: user.user_id,
                name: user.user.name,
                avatar_url: user.user.getAvatarUrl()
            }
        });

        return response;
    }
}

export default SelectUserProductServices;