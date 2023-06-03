import AppError from '../../../api/errors/AppError';
import { IResponseSectorDTO } from '../domain/dtos';
import { ISectorsRepository } from '../domain/repositories/ISectorsRepository';
import { IShowSectorService } from '../domain/services';

export class ShowSectorService implements IShowSectorService {
  constructor(private sectorsRepository: ISectorsRepository) {}

  public async execute(id: string): Promise<IResponseSectorDTO | null> {
    const sector = await this.sectorsRepository.findById(id);

    if (!sector) {
      throw new AppError('Sector not found.', 404);
    }

    return sector;
  }
}
