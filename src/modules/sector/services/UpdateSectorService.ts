import AppError from '../../../api/errors/AppError';
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
      throw new AppError('Sector not found.', 404);
    }

    if (name) {
      const nameAlreadyExists = await this.sectorsRepository.findByName(name);

      if (nameAlreadyExists) {
        throw new AppError('Already exists a sector with this name.', 409);
      }
    }

    await this.sectorsRepository.update({
      id,
      name,
    });
  }
}
