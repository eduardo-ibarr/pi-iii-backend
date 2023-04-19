import { IUpdateAgent } from '../domain/models';
import { AgentsRepository } from '../infra/repositories/AgentsRepository';

export class UpdateAgentService {
  constructor(private agentsRepository: AgentsRepository) {}

  public async execute({
    id,
    email,
    name,
    password,
    tickets_active,
    tickets_finished,
  }: IUpdateAgent & { id: string }): Promise<void> {
    const agent = await this.agentsRepository.findById(id);

    if (!agent) {
      throw new Error('Agent not found.');
    }

    if (email) {
      const agentExists = await this.agentsRepository.findByEmail(email);

      if (agentExists && email !== agent.email) {
        throw new Error('Email already in use.');
      }
    }

    await this.agentsRepository.update({
      id,
      email,
      name,
      password,
      tickets_active,
      tickets_finished,
    });
  }
}
