import { hash } from 'bcrypt';
import AppError from '../../../api/errors/AppError';
import { ICreateRequesterDTO, IResponseRequesterDTO } from '../domain/dtos';
import { ICreateRequesterService } from '../domain/services';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';
import { IRequestersRepository } from '../domain/repositories/IRequestersRepository';
import { IAgentsRepository } from '../../agent/domain/repositories/IAgentsRepository';
import { IAdminsRepository } from '../../admins/domain/repositories/IAdminsRepository';

export class CreateRequesterService implements ICreateRequesterService {
  constructor(
    private requestersRepository: IRequestersRepository,
    private agentsRepository: IAgentsRepository,
    private adminsRepository: IAdminsRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateRequesterDTO): Promise<IResponseRequesterDTO> {
    const emailAlreadyExists =
      (await this.adminsRepository.findByEmail(email)) ||
      (await this.requestersRepository.findByEmail(email)) ||
      (await this.agentsRepository.findByEmail(email));

    if (emailAlreadyExists) {
      throw new AppError('Email already in use.', 409);
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const requester = await this.requestersRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    return requester;
  }
}
