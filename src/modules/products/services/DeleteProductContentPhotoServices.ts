import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IProductsContentPhotoRepository from "../repositories/IProductsContentPhotoRepository";

@injectable()
class DeleteProductContentPhotoServices {
  constructor(
    @inject("ProductsContentPhotoRepository")
    private productsContentPhotoRepository: IProductsContentPhotoRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const productsContentPhoto = await this.productsContentPhotoRepository.findById(
      id
    );

    if (!productsContentPhoto)
      throw new AppError("Conteúdo não encontrado", 400);

    await this.productsContentPhotoRepository.delete(productsContentPhoto.id);
  }
}

export default DeleteProductContentPhotoServices;
