import { Router } from "express";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import ProductNotificationController from "../controllers/ProductNotificationController";

const productNotification = Router();
const productNotificationController = new ProductNotificationController();

productNotification.get('/', ensureAuthenticated, productNotificationController.index);

export default productNotification;