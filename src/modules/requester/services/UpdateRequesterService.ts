import AppError from '../../../api/errors/AppError';
import { IResponseRequesterDTO, IUpdateRequesterDTO } from '../domain/dtos';
import { IRequestersRepository } from '../domain/repositories/IRequestersRepository';
import { IUpdateRequesterService } from '../domain/services';

export class UpdateRequesterService implements IUpdateRequesterService {
  constructor(private requestersRepository: IRequestersRepository) {}

  public async execute({
    id,
    email,
    name,
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

    const requesterUpdated = await this.requestersRepository.update({
      id,
      email,
      name,
    });

    return requesterUpdated;
  }
}
