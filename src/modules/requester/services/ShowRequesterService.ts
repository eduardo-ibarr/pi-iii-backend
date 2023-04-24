import { RequestersRepository } from '../infra/repositories/RequestersRepository';

export class ShowRequesterService {
  constructor(private requestersRepository: RequestersRepository) {}

  public async execute(id: string) {
    const sector = await this.requestersRepository.findById(id);
    return sector;
  }
}
