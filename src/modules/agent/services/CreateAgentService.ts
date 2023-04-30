import AppError from '../../../api/errors/AppError';
import { IAgent, ICreateAgent } from '../domain/models';
import { AgentsRepository } from '../infra/repositories/AgentsRepository';
import { genSaltSync, hashSync } from 'bcrypt';
import { config } from 'dotenv';

config();

export class CreateAgentService {
  constructor(private agentsRepository: AgentsRepository) {}

  public async execute({
    name,
    email,
    password,
    available,
  }: ICreateAgent): Promise<IAgent> {
    const emailExists = await this.agentsRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already in use.', 409);
    }

    const salt = genSaltSync(+process.env.SALT_ROUNDS);
    const passwordHashed = hashSync(password, salt);

    const agent = await this.agentsRepository.create({
      name,
      email,
      password: passwordHashed,
      available,
    });

    return agent;
  }
}
