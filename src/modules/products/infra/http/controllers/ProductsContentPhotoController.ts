import { Request, Response } from "express";
import CreateProductContentPhotoServices from "@modules/products/services/CreateProductContentPhotoServices";
import { container } from "tsyringe";
import DeleteProductContentPhotoServices from "@modules/products/services/DeleteProductContentPhotoServices";

export default class ProductsContentPhotoController {
  public async create(request: Request, response: Response): Promise<Response> {
    const createProductContentPhotoServices = container.resolve(
      CreateProductContentPhotoServices
    );

    const { title, description, content_id, url } = request.body;

    const productContentPhoto = await createProductContentPhotoServices.execute(
      {
        title,
        description,
        content_id,
        url
      }
    );

    return response.json(productContentPhoto);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const deleteProductContentPhotoServices = container.resolve(
      DeleteProductContentPhotoServices
    );
    const id = request.params.id;

    await deleteProductContentPhotoServices.execute(id);

    return response.status(204).json();
  }
}
