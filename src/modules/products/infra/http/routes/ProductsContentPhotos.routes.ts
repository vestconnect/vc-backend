import { getRepository } from "typeorm";
import { Router } from "express";
import multer from "multer";
import ProductContentPhoto from "../../typeorm/entities/ProductContentPhoto";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import uploadConfig from "@config/upload";
import ProductContentPhotoBackgroundController from "../controllers/ProductContentPhotoBackgroundController";
import ProductContentPhotoFileController from "../controllers/ProductContentPhotoFileController";
import ProductsContentPhotoController from "../controllers/ProductsContentPhotoController";
import { classToClass } from "class-transformer";

const productContentPhotoRouter = Router();
const upload = multer(uploadConfig.multer);
const productContentPhotoBackgroundController = new ProductContentPhotoBackgroundController();
const productContentPhotoFileController = new ProductContentPhotoFileController();
const productsContentPhotoController = new ProductsContentPhotoController();

productContentPhotoRouter.get(
  "/:id",
  ensureAuthenticated,
  async (request, response) => {
    const productContentPhotoRepository = getRepository(ProductContentPhoto);
    const content_id = request.params.id;

    const productContentPhoto = await productContentPhotoRepository.find({
      where: { content_id },
    });

    response.json(classToClass(productContentPhoto));
  }
);
productContentPhotoRouter.post(
  "/",
  ensureAuthenticated,
  productsContentPhotoController.create
);
productContentPhotoRouter.patch(
  "/:id/background",
  ensureAuthenticated,
  upload.single("background"),
  productContentPhotoBackgroundController.update
);
productContentPhotoRouter.patch(
  "/:id/file",
  ensureAuthenticated,
  upload.single("file"),
  productContentPhotoFileController.update
);
productContentPhotoRouter.delete(
  "/:id",
  ensureAuthenticated,
  productsContentPhotoController.delete
);

export default productContentPhotoRouter;
