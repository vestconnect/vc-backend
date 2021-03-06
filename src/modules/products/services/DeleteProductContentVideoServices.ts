import { inject, injectable } from "tsyringe";
import AppError from "@shared/errors/AppError";
import IProductsContentVideoRepository from "../repositories/IProductsContentVideoRepository";

@injectable()
class DeleteProductContentVideoServices {
  constructor(
    @inject("ProductsContentVideoRepository")
    private productsContentVideoRepository: IProductsContentVideoRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const productsContentVideo = await this.productsContentVideoRepository.findById(
      id
    );

    if (!productsContentVideo)
      throw new AppError("Conteúdo não encontrado", 400);

    await this.productsContentVideoRepository.delete(productsContentVideo.id);
  }
}

export default DeleteProductContentVideoServices;
