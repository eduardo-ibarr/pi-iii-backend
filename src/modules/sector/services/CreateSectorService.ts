import AppError from '../../../api/errors/AppError';
import { ICreateSector } from '../domain/models';
import { SectorsRepository } from '../infra/repositories/SectorsRepository';

export class CreateSectorService {
  constructor(private sectorsRepository: SectorsRepository) {}

  public async execute({ name }: ICreateSector) {
    const nameAlreadyExists = await this.sectorsRepository.findByName(name);

    if (nameAlreadyExists) {
      throw new AppError('Already exists a sector with this name.', 409);
    }

    const sector = await this.sectorsRepository.create({
      name,
    });

    return sector;
  }
}
