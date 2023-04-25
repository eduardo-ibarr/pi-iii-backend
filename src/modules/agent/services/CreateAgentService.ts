import { IAgent, ICreateAgent } from '../domain/models';
import { AgentsRepository } from '../infra/repositories/AgentsRepository';

export class CreateAgentService {
  constructor(private agentsRepository: AgentsRepository) {}

  public async execute({
    email,
    name,
    password,
    tickets_active,
    tickets_finished,
  }: ICreateAgent): Promise<IAgent> {
    const emailExists = await this.agentsRepository.findByEmail(email);

    if (emailExists) {
      throw new Error('Email already in use.');
    }

    const agent = await this.agentsRepository.create({
      email,
      name,
      password,
      tickets_active,
      tickets_finished,
    });

    return agent;
  }
}
