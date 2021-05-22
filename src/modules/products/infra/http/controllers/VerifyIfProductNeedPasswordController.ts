import { Request, Response } from 'express';
import VerifyIfProductNeedPasswordServices from '@modules/products/services/VerifyIfProductNeedPasswordServices';
import { container } from 'tsyringe';

export default class VerifyIfProductNeedPasswordController {
  public async index(request: Request, response: Response): Promise<Response> {
    const verifyIfProductNeedPasswordServices = container.resolve(VerifyIfProductNeedPasswordServices);
    const nfc_id = request.params.id;

    const resp = await verifyIfProductNeedPasswordServices.execute({
      nfc_id
    });

    return response.json(resp);
  }
}