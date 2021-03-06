import { Request, Response } from "express";
import SelectProductContentServices from "@modules/products/services/SelectProductContentServices";
import CreateProductContentServices from "@modules/products/services/CreateProductContentServices";
import { container } from "tsyringe";
import DeleteProductContentServices from "@modules/products/services/DeleteProductContentServices";

export default class ProductsContentController {
  public async index(request: Request, response: Response): Promise<Response> {
    const selectProductContentServices = container.resolve(
      SelectProductContentServices
    );
    const user_id = request.user.id;
    const product_id = request.params.id;
    const type = request.params.type;

    const productsContent = await selectProductContentServices.execute({
      product_id,
      type,
      user_id,
    });

    return response.json(productsContent);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { description, type, product_id } = request.body;

    const createProductContentServices = container.resolve(
      CreateProductContentServices
    );

    const product = await createProductContentServices.execute({
      description,
      product_id,
      type,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteProductContentServices = container.resolve(
      DeleteProductContentServices
    );
    const id = request.params.id;

    await deleteProductContentServices.execute(id);

    return response.status(204).json();
  }
}
