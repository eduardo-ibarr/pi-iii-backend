import { RequestersRepository } from '../infra/repositories/RequestersRepository';

export class DeleteRequesterService {
  constructor(private requestersRepository: RequestersRepository) {}

  public async execute(id: string): Promise<void> {
    const requester = await this.requestersRepository.findById(id);

    if (!requester) {
      throw new Error('Requester not found.');
    }

    await this.requestersRepository.remove(requester.id);
  }
}