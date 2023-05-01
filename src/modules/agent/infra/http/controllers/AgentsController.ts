import { Request, Response } from 'express';
import { AgentsRepository } from '../../repositories/AgentsRepository';
import {
  ListAgentService,
  ShowAgentService,
  CreateAgentService,
  DeleteAgentService,
  UpdateAgentService,
} from '../../../../../modules/agent/services';

const agentsRepository = new AgentsRepository();

export class AgentsController {
  async index(request: Request, response: Response): Promise<Response> {
    const agents = await new ListAgentService(agentsRepository).execute();

    return response.json(agents);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const agent = await new ShowAgentService(agentsRepository).execute(id);

    return response.json(agent);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { name, email, password, available } = request.body;

    const agent = await new CreateAgentService(agentsRepository).execute({
      name,
      email,
      password,
      available,
    });

    return response.status(201).json(agent);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await new DeleteAgentService(agentsRepository).execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name, email, password, available } = request.body;
    const { id } = request.params;

    const agent = await new UpdateAgentService(agentsRepository).execute({
      id,
      name,
      email,
      password,
      available,
    });

    return response.json(agent);
  }
}
