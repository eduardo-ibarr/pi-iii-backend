import { IRequestersRepository } from '../../requester/domain/repositories/IRequestersRepository';
import AppError from '../../../api/errors/AppError';
import { IResponseAdminDTO, IUpdateAdminDTO } from '../domain/dtos';
import { IAdminsRepository } from '../domain/repositories/IAdminsRepository';
import { IUpdateAdminService } from '../domain/services';
import { IAgentsRepository } from '../../agent/domain/repositories/IAgentsRepository';

export class UpdateAdminService implements IUpdateAdminService {
  constructor(
    private adminsRepository: IAdminsRepository,
    private requestersRepository: IRequestersRepository,
    private agentsRepository: IAgentsRepository
  ) {}

  public async execute({
    id,
    email,
    name,
  }: IUpdateAdminDTO): Promise<IResponseAdminDTO> {
    const admin = await this.adminsRepository.findById(id);

    if (!admin) {
      throw new AppError('Admin not found.');
    }

    if (email) {
      const emailAlreadyExists =
        (await this.adminsRepository.findByEmail(email)) ||
        (await this.requestersRepository.findByEmail(email)) ||
        (await this.agentsRepository.findByEmail(email));

      if (emailAlreadyExists && email !== admin.email) {
        throw new AppError('Email already in use.', 409);
      }
    }

    const adminUpdated = await this.adminsRepository.update({
      id,
      email,
      name,
    });

    return adminUpdated;
  }
}
