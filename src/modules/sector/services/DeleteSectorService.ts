import AppError from '../../../api/errors/AppError';
import { ISectorsRepository } from '../domain/repositories/ISectorsRepository';
import { IDeleteSectorService } from '../domain/services';

export class DeleteSectorService implements IDeleteSectorService {
  constructor(private sectorsRepository: ISectorsRepository) {}

  public async execute(id: string): Promise<void> {
    const sector = await this.sectorsRepository.findById(id);

    if (!sector) {
      throw new AppError('Sector not found.', 404);
    }

    await this.sectorsRepository.remove(sector.id);
  }
}
