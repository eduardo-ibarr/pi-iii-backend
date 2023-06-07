import AppError from '../../../api/errors/AppError';
import { ICreateAgentDTO, IResponseAgentDTO } from '../domain/dtos';
import { ICreateAgentService } from '../domain/services';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';
import { IAgentsRepository } from '../domain/repositories/IAgentsRepository';
import { IAdminsRepository } from '../../admins/domain/repositories/IAdminsRepository';
import { IRequestersRepository } from '../../requester/domain/repositories/IRequestersRepository';

export class CreateAgentService implements ICreateAgentService {
  constructor(
    private agentsRepository: IAgentsRepository,
    private requestersRepository: IRequestersRepository,
    private adminsRepository: IAdminsRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
    available,
  }: ICreateAgentDTO): Promise<IResponseAgentDTO> {
    const emailAlreadyExists =
      (await this.adminsRepository.findByEmail(email)) ||
      (await this.requestersRepository.findByEmail(email)) ||
      (await this.agentsRepository.findByEmail(email));

    if (emailAlreadyExists) {
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
