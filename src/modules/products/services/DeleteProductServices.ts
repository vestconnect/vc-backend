import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IProductsRepository from "../repositories/IProductsRepository";
import IProductsUserRepository from "../repositories/IProductsUserRepository";
import IProductsUserNotificationsRepository from "../repositories/IProductsUserNotificationsRepository";
import ISelectedProductsUserNotificationsRepository from "../repositories/ISelectedProductsUserNotificationsRepository";
import IProductsTagsRepository from "../repositories/IProductsTagsRepository";
import IProductsContentRepository from "../repositories/IProductsContentRepository";
import IProductsTagsNfcRepository from "../repositories/IProductsTagsNfcRepository";
import IProductsContentVideoRepository from "../repositories/IProductsContentVideoRepository";
import IProductsContentPhotoRepository from "../repositories/IProductsContentPhotoRepository";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";

@injectable()
class DeleteProductServices {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject("ProductsUserRepository")
    private productsUserRepository: IProductsUserRepository,
    @inject("ProductsUserNotificationsRepository")
    private productsUserNotificationsRepository: IProductsUserNotificationsRepository,
    @inject("SelectedProductsUserNotificationsRepository")
    private selectedProductsUserNotificationsRepository: ISelectedProductsUserNotificationsRepository,
    @inject("ProductsTagsRepository")
    private productsTagsRepository: IProductsTagsRepository,
    @inject("ProductsContentRepository")
    private productsContentRepository: IProductsContentRepository,
    @inject("ProductsTagsNfcRepository")
    private productsTagsNfcRepository: IProductsTagsNfcRepository,
    @inject("ProductsContentVideoRepository")
    private productsContentVideoRepository: IProductsContentVideoRepository,
    @inject("ProductsContentPhotoRepository")
    private productsContentPhotoRepository: IProductsContentPhotoRepository,
    @inject("CacheProvider")
    private cacheProvider: ICacheProvider
  ) {}

  public async execute(id: string): Promise<void> {
    const product = await this.productsRepository.findById(id);

    if (!product) throw new AppError("Produto não encontrado");

    const productsContent = await this.productsContentRepository.findByProductId(
      id
    );

    for (const productContent of productsContent) {
      await this.productsContentPhotoRepository.deleteByContentId(
        productContent.id
      );
      await this.productsContentVideoRepository.deleteByContentId(
        productContent.id
      );
    }

    await this.productsContentRepository.deleteByProductId(product.id);
    await this.selectedProductsUserNotificationsRepository.deleteByProductId(
      product.id
    );
    await this.productsUserNotificationsRepository.deleteByProductId(
      product.id
    );
    await this.productsTagsNfcRepository.deleteByProductId(product.id);
    await this.productsTagsRepository.deleteByProductId(product.id);
    await this.productsUserRepository.deleteByProductId(product.id);
    await this.productsRepository.delete(product.id);

    await this.cacheProvider.invalidatePrefix("productuser-list");
  }
}

export default DeleteProductServices;
