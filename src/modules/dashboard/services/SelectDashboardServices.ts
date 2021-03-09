import { inject, injectable } from 'tsyringe';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IProductsRepository from '@modules/products/repositories/IProductsRepository';
import IProductsContentRepository from '@modules/products/repositories/IProductsContentRepository';
import IProductsContentVideoRepository from '@modules/products/repositories/IProductsContentVideoRepository';
import IProductsContentPhotoRepository from '@modules/products/repositories/IProductsContentPhotoRepository';

interface IResponse {
  providers: number,
  users: number;
  products: number;
  contents: number;
  video_contents: number;
  photo_contents: number;
}

@injectable()
class SelectDashboardServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
    @inject('ProductsContentRepository')
    private productsContentRepository: IProductsContentRepository,
    @inject('ProductsContentVideoRepository')
    private productsContentVideoRepository: IProductsContentVideoRepository,
    @inject('ProductsContentPhotoRepository')
    private productsContentPhotoRepository: IProductsContentPhotoRepository,
  ) { }

  public async execute(): Promise<IResponse> {
    const users = await this.usersRepository.countUsers();
    const providers = await this.usersRepository.countProviders();
    const products = await this.productsRepository.count();
    const contents = await this.productsContentRepository.count();
    const video_contents = await this.productsContentVideoRepository.count();
    const photo_contents = await this.productsContentPhotoRepository.count();

    return {
      providers,
      users,
      products,
      contents,
      video_contents,
      photo_contents
    }
  }
}

export default SelectDashboardServices;