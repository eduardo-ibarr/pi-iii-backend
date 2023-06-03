import { IResponseRequesterDTO } from '../domain/dtos';
import { IRequestersRepository } from '../domain/repositories/IRequestersRepository';
import { IListRequestersService } from '../domain/services';

export class ListRequestersService implements IListRequestersService {
  constructor(private requestersRepository: IRequestersRepository) {}

  public async execute(): Promise<IResponseRequesterDTO[]> {
    const requesters = await this.requestersRepository.findAll();
    return requesters;
  }
}
