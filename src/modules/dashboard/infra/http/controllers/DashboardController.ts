import { Request, Response } from 'express';
import { container } from 'tsyringe';
import SelectDashboardServices from '@modules/dashboard/services/SelectDashboardServices';

export default class DashboardController {
  public async index(request: Request, response: Response): Promise<Response> {
    const selectDashboardServices = container.resolve(SelectDashboardServices);

    const dashboard = await selectDashboardServices.execute();

    return response.json(dashboard);
  }
}