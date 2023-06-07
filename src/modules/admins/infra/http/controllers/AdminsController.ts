import { Request, Response } from 'express';

import { IAdminServicesFactory } from '../../../domain/factories/AdminServicesFactory';
import { IAdminsController } from '../../../domain/controllers/IAdminsController';

export class AdminsController implements IAdminsController {
  constructor(private adminServicesFactory: IAdminServicesFactory) {
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const service = this.adminServicesFactory.listAdminsService();
    const admins = await service.execute();

    return response.status(200).json(admins);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.adminServicesFactory.showAdminService();
    const admin = await service.execute(id);

    return response.status(200).json(admin);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;
    const service = this.adminServicesFactory.createAdminService();
    const admin = await service.execute({ email, name, password });

    return response.status(201).json(admin);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.adminServicesFactory.deleteAdminService();
    await service.execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;
    const { id } = request.params;
    const service = this.adminServicesFactory.updateAdminService();
    const admin = await service.execute({
      id,
      email,
      name,
      password,
    });

    return response.status(200).json(admin);
  }

  async updatePassword(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { old_password, new_password } = request.body;
    const { id } = request.params;
    const service = this.adminServicesFactory.updateAdminPasswordService();

    await service.execute({
      id,
      new_password,
      old_password,
    });

    return response.sendStatus(200);
  }
}
