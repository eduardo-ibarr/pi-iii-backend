import AppError from '../../../api/errors/AppError';
import { ICreateTicket } from '../domain/models';

import { AgentsRepository } from '../../../modules/agent/infra/repositories/AgentsRepository';
import { CategoriesRepository } from '../../../modules/category/infra/repositories/CategoriesRepository';
import { RequestersRepository } from '../../../modules/requester/infra/repositories/RequestersRepository';
import { SectorsRepository } from '../../../modules/sector/infra/repositories/SectorsRepository';
import { TicketsRepository } from '../infra/repositories/TicketsRepository';

export class CreateTicketService {
  constructor(
    private ticketsRepository: TicketsRepository,
    private requestersRepository: RequestersRepository,
    private categoriesRepository: CategoriesRepository,
    private agentsRepository: AgentsRepository,
    private sectorsRepository: SectorsRepository
  ) {}

  public async execute({
    requester_id,
    category_id,
    sector_id,
    status,
    subject,
    content,
  }: ICreateTicket) {
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
