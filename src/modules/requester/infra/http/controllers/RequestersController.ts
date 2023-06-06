import { Request, Response } from 'express';

import { IRequesterServicesFactory } from '../../../domain/factories/IRequesterServicesFactory';
import { IRequestersController } from '../../../domain/controllers/IRequestersController';

export class RequestersController implements IRequestersController {
  constructor(private requesterServicesFactory: IRequesterServicesFactory) {
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const service = this.requesterServicesFactory.listRequestersService();
    const requesters = await service.execute();

    return response.status(200).json(requesters);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.requesterServicesFactory.showRequesterService();
    const requester = await service.execute(id);

    return response.status(200).json(requester);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;
    const service = this.requesterServicesFactory.createRequesterService();
    const requester = await service.execute({ email, name, password });

    return response.status(201).json(requester);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.requesterServicesFactory.deleteRequesterService();
    await service.execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;
    const { id } = request.params;
    const service = this.requesterServicesFactory.updateRequesterService();
    const requester = await service.execute({
      id,
      email,
      name,
      password,
    });

    return response.status(200).json(requester);
  }

  async updatePassword(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { old_password, new_password } = request.body;
    const { id } = request.params;
    const service =
      this.requesterServicesFactory.updateRequesterPasswordService();

    await service.execute({
      id,
      new_password,
      old_password,
    });

    return response.sendStatus(200);
  }
}
