import AppError from '../../../api/errors/AppError';
import { IUpdateAgent } from '../domain/models';
import { AgentsRepository } from '../infra/repositories/AgentsRepository';

export class UpdateAgentService {
  constructor(private agentsRepository: AgentsRepository) {}

  public async execute({
    id,
    name,
    email,
    password,
    available,
  }: IUpdateAgent & { id: string }): Promise<void> {
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

    await this.agentsRepository.update({
      id,
      name,
      email,
      password,
      available,
    });
  }
}
