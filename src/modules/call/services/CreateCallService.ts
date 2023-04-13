import { ICreateCallRepository } from '../domain/models';
import { CallsRepository } from '../infra/repositories/CallsRepository';

export class CreateCallService {
  constructor(private CallsRepository: CallsRepository) {}

  public async execute({
    id_category,
    id_requester,
    id_sector,
    status,
    subject,
    description,
  }: ICreateCallRepository) {
    const call = await this.CallsRepository.create({
      id_category,
      id_requester,
      id_sector,
      status,
      subject,
      description,
    });

    return call;
  }
}
