import { AgentsRepository } from '../infra/repositories/AgentsRepository';

export class DeleteAgentService {
  constructor(private agentsRepository: AgentsRepository) {}

  public async execute(id: string): Promise<void> {
    const agent = await this.agentsRepository.findById(id);

    if (!agent) {
      throw new Error('Agent not found.');
    }

    await this.agentsRepository.remove(agent.id);
  }
}
