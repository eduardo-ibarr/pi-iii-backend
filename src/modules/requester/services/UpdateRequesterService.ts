import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';
import AppError from '../../../api/errors/AppError';
import { IResponseRequesterDTO, IUpdateRequesterDTO } from '../domain/dtos';
import { IRequestersRepository } from '../domain/repositories/IRequestersRepository';
import { IUpdateRequesterService } from '../domain/services';

export class UpdateRequesterService implements IUpdateRequesterService {
  constructor(
    private requestersRepository: IRequestersRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    id,
    email,
    name,
    password,
  }: IUpdateRequesterDTO): Promise<IResponseRequesterDTO> {
    const requester = await this.requestersRepository.findById(id);

    if (!requester) {
      throw new AppError('Requester not found.');
    }

    if (email) {
      const emailAlreadyExists = await this.requestersRepository.findByEmail(
        email
      );

      if (emailAlreadyExists && email !== requester.email) {
        throw new AppError('Email already in use.', 409);
      }
    }

    if (password) {
      password = await this.hashProvider.generateHash(password);
    }

    const requesterUpdated = await this.requestersRepository.update({
      id,
      email,
      name,
      password,
    });

    return requesterUpdated;
  }
}
