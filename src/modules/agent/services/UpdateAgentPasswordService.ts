import AppError from '../../../api/errors/AppError';
import { IUpdateAgentPasswordDTO } from '../domain/dtos';
import { IAgentsRepository } from '../domain/repositories/IAgentsRepository';
import { IUpdateAgentPasswordService } from '../domain/services';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';

export class UpdateAgentPasswordService implements IUpdateAgentPasswordService {
  constructor(
    private agentsRepository: IAgentsRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    id,
    new_password,
    old_password,
  }: IUpdateAgentPasswordDTO): Promise<void> {
    const agent = await this.agentsRepository.findById(id);

    if (!agent) {
      throw new AppError('Agent not found.', 404);
    }

    const agentAuthData =
      await this.agentsRepository.findByEmailReturningAuthData(agent.email);

    const isSamePasswordTyped = await this.hashProvider.compareHash(
      old_password,
      agentAuthData?.password || ''
    );

    if (!isSamePasswordTyped) {
      throw new AppError(
        'Password received not equals to the existing password.',
        400
      );
    }

    const passwordUpdated = await this.hashProvider.generateHash(new_password);

    await this.agentsRepository.update({
      id,
      password: passwordUpdated,
    });
  }
}
