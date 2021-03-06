import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IProductsContentRepository from "../repositories/IProductsContentRepository";
import IProductsContentVideoRepository from "../repositories/IProductsContentVideoRepository";
import IProductsContentPhotoRepository from "../repositories/IProductsContentPhotoRepository";

@injectable()
class DeleteProductContentServices {
  constructor(
    @inject("ProductsContentRepository")
    private productsContentRepository: IProductsContentRepository,
    @inject("ProductsContentVideoRepository")
    private productsContentVideoRepository: IProductsContentVideoRepository,
    @inject("ProductsContentPhotoRepository")
    private productsContentPhotoRepository: IProductsContentPhotoRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const productsContent = await this.productsContentRepository.findById(id);

    if (!productsContent) throw new AppError("Conteúdo não encontrado", 400);

    await this.productsContentPhotoRepository.deleteByContentId(
      productsContent.id
    );
    await this.productsContentVideoRepository.deleteByContentId(
      productsContent.id
    );
    await this.productsContentRepository.delete(productsContent.id);
  }
}

export default DeleteProductContentServices;
