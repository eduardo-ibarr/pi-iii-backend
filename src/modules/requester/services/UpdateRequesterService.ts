import { IUpdateRequester } from '../domain/models';
import { RequestersRepository } from '../infra/repositories/RequestersRepository';

export class UpdateRequesterService {
  constructor(private requestersRepository: RequestersRepository) {}

  public async execute({
    id,
    email,
    name,
    password,
  }: IUpdateRequester & { id: string }): Promise<void> {
    const requester = await this.requestersRepository.findById(id);

    if (!requester) {
      throw new Error('Requester not found.');
    }

    await this.requestersRepository.update({
      id,
      email,
      name,
      password,
    });
  }
}
