import { Request, Response } from 'express';
import { ListAgentService } from '@modules/agent/services/ListAgentService';
import { AgentsRepository } from '../../repositories/AgentsRepository';
import { ShowAgentService } from '@modules/agent/services/ShowAgentService';
import { CreateAgentService } from '@modules/agent/services/CreateAgentService';
import { DeleteAgentService } from '@modules/agent/services/DeleteAgentService';
import { UpdateAgentService } from '@modules/agent/services/UpdateAgentService';

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
