import AppError from '../../../api/errors/AppError';
import { ICreateSectorDTO, IResponseSectorDTO } from '../domain/dtos';
import { ISectorsRepository } from '../domain/repositories/ISectorsRepository';
import { ICreateSectorService } from '../domain/services';

export class CreateSectorService implements ICreateSectorService {
  constructor(private sectorsRepository: ISectorsRepository) {}

  public async execute({
    name,
  }: ICreateSectorDTO): Promise<IResponseSectorDTO> {
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
