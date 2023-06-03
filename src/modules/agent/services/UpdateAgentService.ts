import AppError from '../../../api/errors/AppError';
import { IResponseAgentDTO, IUpdateAgentDTO } from '../domain/dtos';
import { IAgentsRepository } from '../domain/repositories/IAgentsRepository';
import { IUpdateAgentService } from '../domain/services';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';

export class UpdateAgentService implements IUpdateAgentService {
  constructor(
    private agentsRepository: IAgentsRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    id,
    name,
    email,
    password,
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

    if (password) {
      password = await this.hashProvider.generateHash(password);
    }

    const agentUpdated = await this.agentsRepository.update({
      id,
      name,
      email,
      password,
      available,
    });

    return agentUpdated;
  }
}
