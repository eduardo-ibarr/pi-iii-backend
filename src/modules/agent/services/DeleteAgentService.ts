import AppError from '../../../api/errors/AppError';
import { AgentsRepository } from '../infra/repositories/AgentsRepository';

export class DeleteAgentService {
  constructor(private agentsRepository: AgentsRepository) {}

  public async execute(id: string): Promise<any> {
    const agent = await this.agentsRepository.findById(id);

    if (!agent) {
      throw new AppError('Agent not found.', 404);
    }

    return await this.agentsRepository.remove(agent.id);
  }
}
