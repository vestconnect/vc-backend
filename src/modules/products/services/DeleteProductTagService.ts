import { inject, injectable } from 'tsyringe';
import IProductsTagsRepository from '../repositories/IProductsTagsRepository'
import AppError from '@shared/errors/AppError';

interface IRequest {
    id: string;
}

@injectable()
class DeleteProductTagService {
    constructor(
        @inject('ProductsTagsRepository')
        private productsTagsRepository: IProductsTagsRepository
    ) { }

    public async delete({ id }: IRequest): Promise<void> {
        const tag = await this.productsTagsRepository.findById(id);

        if (!tag) {
            throw new AppError('Tag não encontrada', 401);
        }

        await this.productsTagsRepository.delete(id);
    }
}

export default DeleteProductTagService;