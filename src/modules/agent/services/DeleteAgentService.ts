import AppError from '../../../api/errors/AppError';
import { IAgentsRepository } from '../domain/repositories/IAgentsRepository';
import { IDeleteAgentService } from '../domain/services';

export class DeleteAgentService implements IDeleteAgentService {
  constructor(private agentsRepository: IAgentsRepository) {}

  public async execute(id: string): Promise<any> {
    const agent = await this.agentsRepository.findById(id);

    if (!agent) {
      throw new AppError('Agent not found.', 404);
    }

    return await this.agentsRepository.remove(agent.id);
  }
}
