import { IUpdateSector } from '../domain/models';
import { SectorsRepository } from '../infra/repositories/SectorsRepository';

export class UpdateSectorService {
  constructor(private sectorsRepository: SectorsRepository) {}

  public async execute({
    id,
    name,
  }: IUpdateSector & { id: string }): Promise<void> {
    const sector = await this.sectorsRepository.findById(id);

    if (!sector) {
      throw new Error('Sector not found.');
    }

    await this.sectorsRepository.update({
      id,
      name,
    });
  }
}
