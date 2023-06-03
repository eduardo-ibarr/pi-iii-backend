import AppError from '../../../api/errors/AppError';
import { IResponseAgentDTO } from '../domain/dtos';
import { IAgentsRepository } from '../domain/repositories/IAgentsRepository';
import { IShowAgentService } from '../domain/services';

export class ShowAgentService implements IShowAgentService {
  constructor(private agentsRepository: IAgentsRepository) {}

  public async execute(id: string): Promise<IResponseAgentDTO> {
    const agent = await this.agentsRepository.findById(id);

    if (!agent) {
      throw new AppError('Agent not found.', 404);
    }

    return agent;
  }
}
