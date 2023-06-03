import AppError from '../../../api/errors/AppError';
import { IRequestersRepository } from '../domain/repositories/IRequestersRepository';
import { IDeleteRequesterService } from '../domain/services';

export class DeleteRequesterService implements IDeleteRequesterService {
  constructor(private requestersRepository: IRequestersRepository) {}

  public async execute(id: string): Promise<void> {
    const requester = await this.requestersRepository.findById(id);

    if (!requester) {
      throw new AppError('Requester not found.');
    }

    await this.requestersRepository.remove(requester.id);
  }
}
