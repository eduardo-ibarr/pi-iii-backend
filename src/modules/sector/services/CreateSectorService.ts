import { ICreateSector } from '../domain/models';
import { SectorsRepository } from '../infra/repositories/SectorsRepository';

export class CreateSectorService {
  constructor(private sectorsRepository: SectorsRepository) {}

  public async execute({ name }: ICreateSector) {
    const sector = await this.sectorsRepository.create({
      name,
    });

    return sector;
  }
}
