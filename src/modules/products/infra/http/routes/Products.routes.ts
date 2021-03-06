import { getRepository } from "typeorm";
import { Router } from "express";
import multer from "multer";
import Product from "@modules/products/infra/typeorm/entities/Product";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import uploadConfig from "@config/upload";
import ProductsController from "../controllers/ProductsController";
import ProductAvatarController from "../controllers/ProductAvatarController";
import ProductBackgroundController from "../controllers/ProductBackgroundController";
import ProductNotificationController from "../controllers/ProductNotificationController";
import { classToClass } from "class-transformer";

const productsRouter = Router();
const upload = multer(uploadConfig.multer);
const productsController = new ProductsController();
const productAvatarController = new ProductAvatarController();
const productBackgroundController = new ProductBackgroundController();
const productNotificationController = new ProductNotificationController();

productsRouter.get("/", ensureAuthenticated, async (request, response) => {
  const productRepository = getRepository(Product);
  const user_id = request.user.id;

  const products = await productRepository.find({
    where: { user_id },
  });

  response.json(classToClass(products));
});
productsRouter.get(
  "/:id/products",
  ensureAuthenticated,
  async (request, response) => {
    const productRepository = getRepository(Product);
    const id = request.params.id;

    const products = await productRepository.find({
      where: { user_id: id },
    });

    response.json(classToClass(products));
  }
);
productsRouter.get("/:id", ensureAuthenticated, async (request, response) => {
  const productRepository = getRepository(Product);
  const id = request.params.id;
  const user_id = request.user.id;

  const products = await productRepository.findOne({
    where: { id, user_id },
  });

  response.json(classToClass(products));
});
productsRouter.get("/:nfc/nfc", productsController.index);
productsRouter.put("/", ensureAuthenticated, productsController.update);
productsRouter.post("/", ensureAuthenticated, productsController.create);
productsRouter.post(
  "/notification",
  ensureAuthenticated,
  productNotificationController.create
);
productsRouter.patch(
  "/:id/avatar",
  ensureAuthenticated,
  upload.single("avatar"),
  productAvatarController.update
);
productsRouter.patch(
  "/:id/background",
  ensureAuthenticated,
  upload.single("background"),
  productBackgroundController.update
);
productsRouter.delete("/:id", ensureAuthenticated, productsController.delete);

export default productsRouter;
