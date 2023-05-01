import AppError from '../../../api/errors/AppError';
import { SectorsRepository } from '../infra/repositories/SectorsRepository';

export class DeleteSectorService {
  constructor(private sectorsRepository: SectorsRepository) {}

  public async execute(id: string): Promise<void> {
    const sector = await this.sectorsRepository.findById(id);

    if (!sector) {
      throw new AppError('Sector not found.', 404);
    }

    await this.sectorsRepository.remove(sector.id);
  }
}
