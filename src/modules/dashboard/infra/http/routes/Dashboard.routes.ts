import { Router } from "express";
import ensureAuthenticated from "@modules/users/infra/http/middlewares/ensureAuthenticated";
import DashboardController from '../controllers/DashboardController';

const dashboardRouter = Router();
const dashboardController = new DashboardController();

dashboardRouter.get('/', ensureAuthenticated, dashboardController.index);

export default dashboardRouter;