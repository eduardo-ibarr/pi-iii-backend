import { RequestersRepository } from '../infra/repositories/RequestersRepository';

export class ListRequestersService {
  constructor(private requestersRepository: RequestersRepository) {}

  public async execute() {
    const requesters = await this.requestersRepository.findAll();
    return requesters;
  }
}
