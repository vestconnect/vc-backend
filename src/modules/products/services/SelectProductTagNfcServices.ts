import { inject, injectable } from "tsyringe";
import IProductsTagsNfcRepository from "../repositories/IProductsTagsNfcRepository";
import ProductTagNfc from "../infra/typeorm/entities/ProductTagNfc";

interface IResponseFindByProductId {
  total: number;
  total_pages: number;
  productsTagNfc: ProductTagNfc[];
}

interface IRequest {
  product_id: string;
  page: number;
}

@injectable()
class SelectProductTagNfcServices {
  constructor(
    @inject("ProductsTagsNfcRepository")
    private productsTagsNfcRepository: IProductsTagsNfcRepository
  ) {}

  public async execute({
    product_id,
    page,
  }: IRequest): Promise<IResponseFindByProductId> {
    const response = await this.productsTagsNfcRepository.findByProductId(
      product_id,
      page
    );

    return response;
  }
}

export default SelectProductTagNfcServices;
