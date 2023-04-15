import { CallsRepository } from '../infra/repositories/CallsRepository';

export class ListCallsService {
  constructor(private callsRepository: CallsRepository) {}

  public async execute() {
    const calls = await this.callsRepository.list();
    return calls;
  }
}
