import { SectorsRepository } from '../infra/repositories/SectorsRepository';

export class ShowSectorService {
  constructor(private sectorsRepository: SectorsRepository) {}

  public async execute(id: string) {
    const sector = await this.sectorsRepository.findById(id);
    return sector;
  }
}
