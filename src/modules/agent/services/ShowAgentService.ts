import { IAgent } from '../domain/models';
import { AgentsRepository } from '../infra/repositories/AgentsRepository';

export class ShowAgentService {
  constructor(private agentsRepository: AgentsRepository) {}

  public async execute(id: string): Promise<IAgent> {
    const agent = await this.agentsRepository.findById(id);

    if (!agent) {
      throw new Error('Agent not found.');
    }

    return agent;
  }
}
