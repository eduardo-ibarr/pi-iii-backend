import AppError from '../../../api/errors/AppError';
import { ICreateAgentDTO, IResponseAgentDTO } from '../domain/dtos';
import { ICreateAgentService } from '../domain/services';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';
import { IAgentsRepository } from '../domain/repositories/IAgentsRepository';

export class CreateAgentService implements ICreateAgentService {
  constructor(
    private agentsRepository: IAgentsRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
    available,
  }: ICreateAgentDTO): Promise<IResponseAgentDTO> {
    const emailExists = await this.agentsRepository.findByEmail(email);

    if (emailExists) {
      throw new AppError('Email already in use.', 409);
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const agent = await this.agentsRepository.create({
      name,
      email,
      password: passwordHashed,
      available,
    });

    return agent;
  }
}
