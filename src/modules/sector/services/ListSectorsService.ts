import { SectorsRepository } from '../infra/repositories/SectorsRepository';

export class ListSectorsService {
  constructor(private sectorsRepository: SectorsRepository) {}

  public async execute() {
    const sectors = await this.sectorsRepository.findAll();
    return sectors;
  }
}
