import { inject, injectable } from "tsyringe";
import AppError from '@shared/errors/AppError';
import IProductsRepository from "../repositories/IProductsRepository";
import IProductsTagsNfcRepository from "../repositories/IProductsTagsNfcRepository";

interface IRequest {
  nfc_id: string
}

interface IReturnProductNeedPassword {
  need_password: boolean;
}

@injectable()
class VerifyIfProductNeedPasswordServices {
  constructor(
    @inject("ProductsRepository")
    private productsRepository: IProductsRepository,
    @inject('ProductsTagsNfcRepository')
    private productsTagsNFcRepository: IProductsTagsNfcRepository,
  ) { }

  public async execute({ nfc_id }: IRequest): Promise<IReturnProductNeedPassword> {
    let product = await this.productsRepository.findByNfc(nfc_id);

    if (!product) {
      const productNfc = await this.productsTagsNFcRepository.findByTag(nfc_id);

      if (!productNfc) {
        throw new AppError('Produto não encontrado', 401);
      }

      product = await this.productsRepository.findById(productNfc.product_id);

      if (!product) {
        throw new AppError('Produto não encontrado', 401);
      }
    };

    return {
      need_password: product.need_password
    }
  }
}

export default VerifyIfProductNeedPasswordServices;
