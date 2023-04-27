import { ICreateRequester } from '../domain/models';
import { RequestersRepository } from '../infra/repositories/RequestersRepository';

export class CreateRequesterService {
  constructor(private requestersRepository: RequestersRepository) {}

  public async execute({ name, email, password }: ICreateRequester) {
    const requester = await this.requestersRepository.create({
      name,
      email,
      password,
    });

    return requester;
  }
}
