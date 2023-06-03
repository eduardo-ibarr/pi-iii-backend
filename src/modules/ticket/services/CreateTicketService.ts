import AppError from '../../../api/errors/AppError';
import { ICreateTicketDTO, IResponseTicketDTO } from '../domain/dtos';

import { ICategoriesRepository } from '../../../modules/category/domain/repositories/ICategoriesRepository';
import { IRequestersRepository } from '../../../modules/requester/domain/repositories/IRequestersRepository';
import { ISectorsRepository } from '../../../modules/sector/domain/repositories/ISectorsRepository';
import { ITicketsRepository } from '../domain/repositories/ITicketsRepository';
import { ICreateTicketService } from '../domain/services';

export class CreateTicketService implements ICreateTicketService {
  constructor(
    private ticketsRepository: ITicketsRepository,
    private requestersRepository: IRequestersRepository,
    private categoriesRepository: ICategoriesRepository,
    private sectorsRepository: ISectorsRepository
  ) {}

  public async execute({
    requester_id,
    category_id,
    sector_id,
    status,
    subject,
    content,
  }: ICreateTicketDTO): Promise<IResponseTicketDTO> {
    const requesterExists = await this.requestersRepository.findById(
      requester_id
    );

    if (!requesterExists) {
      throw new AppError('The requester informed does not exists.', 404);
    }

    const categoryExists = await this.categoriesRepository.findById(
      category_id
    );

    if (!categoryExists) {
      throw new AppError('The category informed does not exists.', 404);
    }

    const sectorExists = await this.sectorsRepository.findById(sector_id);

    if (!sectorExists) {
      throw new AppError('The sector informed does not exists.', 404);
    }

    const ticket = await this.ticketsRepository.create({
      requester_id,
      category_id,
      sector_id,
      status,
      subject,
      content,
    });

    return ticket;
  }
}
