import AppError from '../../../api/errors/AppError';
import { IResponseAgentDTO, IUpdateAgentDTO } from '../domain/dtos';
import { IAgentsRepository } from '../domain/repositories/IAgentsRepository';
import { IUpdateAgentService } from '../domain/services';

export class UpdateAgentService implements IUpdateAgentService {
  constructor(private agentsRepository: IAgentsRepository) {}

  public async execute({
    id,
    name,
    email,
    available,
  }: IUpdateAgentDTO): Promise<IResponseAgentDTO> {
    const agent = await this.agentsRepository.findById(id);

    if (!agent) {
      throw new AppError('Agent not found.', 404);
    }

    if (email) {
      const agentExists = await this.agentsRepository.findByEmail(email);

      if (agentExists && email !== agent.email) {
        throw new AppError('Email already in use.', 409);
      }
    }

    const agentUpdated = await this.agentsRepository.update({
      id,
      name,
      email,
      available,
    });

    return agentUpdated;
  }
}
