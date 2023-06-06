import { Request, Response } from 'express';
import { IAgentsController } from '../../../domain/controllers/IAgentsController';
import { IAgentServicesFactory } from '../../../domain/factories/IAgentServicesFactory';

export class AgentsController implements IAgentsController {
  constructor(private agentServicesFactory: IAgentServicesFactory) {
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.updatePassword = this.updatePassword.bind(this);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const service = this.agentServicesFactory.listAgentsService();
    const agents = await service.execute();

    return response.status(200).json(agents);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.agentServicesFactory.showAgentService();
    const agent = await service.execute(id);

    return response.status(200).json(agent);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password, available } = request.body;
    const service = this.agentServicesFactory.createAgentService();
    const agent = await service.execute({
      name,
      email,
      password,
      available,
    });

    return response.status(201).json(agent);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.agentServicesFactory.deleteAgentService();
    await service.execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, available } = request.body;
    const { id } = request.params;
    const service = this.agentServicesFactory.updateAgentService();

    const agent = await service.execute({
      id,
      name,
      email,
      password,
      available,
    });

    return response.status(200).json(agent);
  }

  async updatePassword(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { old_password, new_password } = request.body;
    const { id } = request.params;
    const service = this.agentServicesFactory.updateAgentPasswordService();

    await service.execute({
      id,
      new_password,
      old_password,
    });

    return response.sendStatus(200);
  }
}
