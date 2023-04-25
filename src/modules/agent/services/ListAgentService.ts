import { IAgent } from '../domain/models';
import { AgentsRepository } from '../infra/repositories/AgentsRepository';

export class ListAgentService {
  constructor(private agentsRepository: AgentsRepository) {}

  public async execute(): Promise<IAgent[]> {
    const agent = await this.agentsRepository.findAll();
    return agent;
  }
}
