import { getRepository } from "typeorm";
import { Router } from "express";
import multer from "multer";
import ProductContentVideo from "../../typeorm/entities/ProductContentVideo";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import uploadConfig from "@config/upload";
import ProductsContentVideoController from "../controllers/ProductsContentVideoController";
import ProductContentVideoBackgroundController from "../controllers/ProductContentVideoBackgroundController";
import ProductContentVideoFileController from "../controllers/ProductContentVideoFileController";
import { classToClass } from "class-transformer";

const productContentVideoRouter = Router();
const upload = multer(uploadConfig.multer);
const productsContentVideoController = new ProductsContentVideoController();
const productContentVideoBackgroundController = new ProductContentVideoBackgroundController();
const productContentVideoFileController = new ProductContentVideoFileController();

productContentVideoRouter.get(
  "/:id",
  ensureAuthenticated,
  async (request, response) => {
    const productContentVideoRepository = getRepository(ProductContentVideo);
    const content_id = request.params.id;

    const productContentVideo = await productContentVideoRepository.find({
      where: { content_id },
    });

    response.json(classToClass(productContentVideo));
  }
);

productContentVideoRouter.post(
  "/",
  ensureAuthenticated,
  productsContentVideoController.create
);
productContentVideoRouter.patch(
  "/:id/background",
  ensureAuthenticated,
  upload.single("background"),
  productContentVideoBackgroundController.update
);
productContentVideoRouter.patch(
  "/:id/file",
  ensureAuthenticated,
  upload.single("file"),
  productContentVideoFileController.update
);
productContentVideoRouter.delete(
  "/:id",
  ensureAuthenticated,
  productsContentVideoController.delete
);

export default productContentVideoRouter;
