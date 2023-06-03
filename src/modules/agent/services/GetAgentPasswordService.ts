import AppError from '../../../api/errors/AppError';
import { IAgentPasswordDTO } from '../domain/dtos';
import { IAgentsRepository } from '../domain/repositories/IAgentsRepository';
import { IGetAgentPasswordService } from '../domain/services';

export class DeleteAgentService implements IGetAgentPasswordService {
  constructor(private agentsRepository: IAgentsRepository) {}

  public async execute(id: string): Promise<IAgentPasswordDTO | null> {
    const agent = await this.agentsRepository.findById(id);

    if (!agent) {
      throw new AppError('Agent not found.', 404);
    }

    const password = await this.agentsRepository.findByIdReturningPassword(
      agent.id
    );

    return password;
  }
}
