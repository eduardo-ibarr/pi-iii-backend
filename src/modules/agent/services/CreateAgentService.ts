import { IAgent, ICreateAgent } from '../domain/models';
import { AgentsRepository } from '../infra/repositories/AgentsRepository';

export class CreateAgentService {
  constructor(private agentsRepository: AgentsRepository) {}

  public async execute({
    name,
    ticket_history,
    email,
    password,
    available,
  }: ICreateAgent): Promise<IAgent> {
    const emailExists = await this.agentsRepository.findByEmail(email);

    if (emailExists) {
      throw new Error('Email already in use.');
    }

    const agent = await this.agentsRepository.create({
      name,
      ticket_history,
      email,
      password,
      available,
    });

    return agent;
  }
}
