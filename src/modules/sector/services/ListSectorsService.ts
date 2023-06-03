import { ISectorsRepository } from '../domain/repositories/ISectorsRepository';
import { IListSectorsService } from '../domain/services';

export class ListSectorsService implements IListSectorsService {
  constructor(private sectorsRepository: ISectorsRepository) {}

  public async execute() {
    const sectors = await this.sectorsRepository.findAll();
    return sectors;
  }
}
