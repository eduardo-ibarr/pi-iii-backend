import { CallsRepository } from '../infra/repositories/CallsRepository';

export class ShowCallService {
  constructor(private callsRepository: CallsRepository) {}

  public async execute(id: string) {
    const call = await this.callsRepository.findById(id);
    return call;
  }
}
