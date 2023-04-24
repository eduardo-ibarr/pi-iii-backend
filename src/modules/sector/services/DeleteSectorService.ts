import { SectorsRepository } from '../infra/repositories/SectorsRepository';

export class DeleteSectorService {
  constructor(private sectorsRepository: SectorsRepository) {}

  public async execute(id: string): Promise<void> {
    const sector = await this.sectorsRepository.findById(id);

    if (!sector) {
      throw new Error('Sector not found.');
    }

    await this.sectorsRepository.remove(sector.id);
  }
}
