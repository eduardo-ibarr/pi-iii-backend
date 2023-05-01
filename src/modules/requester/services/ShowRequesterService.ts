import AppError from '../../../api/errors/AppError';
import { RequestersRepository } from '../infra/repositories/RequestersRepository';

export class ShowRequesterService {
  constructor(private requestersRepository: RequestersRepository) {}

  public async execute(id: string) {
    const requester = await this.requestersRepository.findById(id);

    if (!requester) {
      throw new AppError('Requester not found.');
    }

    return requester;
  }
}
