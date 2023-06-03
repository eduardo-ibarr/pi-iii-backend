import AppError from '../../../api/errors/AppError';
import { IResponseSectorDTO, IUpdateSectorDTO } from '../domain/dtos';
import { ISectorsRepository } from '../domain/repositories/ISectorsRepository';
import { IUpdateSectorService } from '../domain/services';

export class UpdateSectorService implements IUpdateSectorService {
  constructor(private sectorsRepository: ISectorsRepository) {}

  public async execute({
    id,
    name,
  }: IUpdateSectorDTO): Promise<IResponseSectorDTO> {
    const sector = await this.sectorsRepository.findById(id);

    if (!sector) {
      throw new AppError('Sector not found.', 404);
    }

    if (name) {
      const nameAlreadyExists = await this.sectorsRepository.findByName(name);

      if (nameAlreadyExists) {
        throw new AppError('Already exists a sector with this name.', 409);
      }
    }

    const sectorUpdated = await this.sectorsRepository.update({
      id,
      name,
    });

    return sectorUpdated;
  }
}
