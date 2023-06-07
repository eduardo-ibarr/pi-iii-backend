import AppError from '../../../api/errors/AppError';
import { ICreateAdminDTO, IResponseAdminDTO } from '../domain/dtos';
import { ICreateAdminService } from '../domain/services';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';
import { IAdminsRepository } from '../domain/repositories/IAdminsRepository';
import { IRequestersRepository } from '../../requester/domain/repositories/IRequestersRepository';
import { IAgentsRepository } from '../../agent/domain/repositories/IAgentsRepository';

export class CreateAdminService implements ICreateAdminService {
  constructor(
    private adminsRepository: IAdminsRepository,
    private requestersRepository: IRequestersRepository,
    private agentsRepository: IAgentsRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateAdminDTO): Promise<IResponseAdminDTO> {
    const emailAlreadyExists =
      (await this.adminsRepository.findByEmail(email)) ||
      (await this.requestersRepository.findByEmail(email)) ||
      (await this.agentsRepository.findByEmail(email));

    if (emailAlreadyExists) {
      throw new AppError('Email already in use.', 409);
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const admin = await this.adminsRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    return admin;
  }
}
