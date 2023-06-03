import AppError from '../../../api/errors/AppError';
import { IResponseRequesterDTO } from '../domain/dtos';
import { IRequestersRepository } from '../domain/repositories/IRequestersRepository';

export class ShowRequesterService {
  constructor(private requestersRepository: IRequestersRepository) {}

  public async execute(id: string): Promise<IResponseRequesterDTO | null> {
    const requester = await this.requestersRepository.findById(id);

    if (!requester) {
      throw new AppError('Requester not found.');
    }

    return requester;
  }
}
