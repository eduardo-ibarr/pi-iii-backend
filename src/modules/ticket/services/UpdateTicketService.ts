import AppError from '../../../api/errors/AppError';
import { IResponseTicketDTO, IUpdateTicketDTO } from '../domain/dtos';

import { AgentsRepository } from '../../../modules/agent/infra/repositories/AgentsRepository';
import { CategoriesRepository } from '../../../modules/category/infra/repositories/CategoriesRepository';
import { RequestersRepository } from '../../../modules/requester/infra/repositories/RequestersRepository';
import { SectorsRepository } from '../../../modules/sector/infra/repositories/SectorsRepository';
import { TicketsRepository } from '../infra/repositories/TicketsRepository';
import { IUpdateTicketService } from '../domain/services';

export class UpdateTicketService implements IUpdateTicketService {
  constructor(
    private ticketsRepository: TicketsRepository,
    private requestersRepository: RequestersRepository,
    private categoriesRepository: CategoriesRepository,
    private agentsRepository: AgentsRepository,
    private sectorsRepository: SectorsRepository
  ) {}

  public async execute({
    id,
    agent_id,
    category_id,
    content,
    requester_id,
    sector_id,
    status,
    subject,
    read_status,
  }: IUpdateTicketDTO): Promise<IResponseTicketDTO> {
    if (requester_id) {
      const requesterExists = await this.requestersRepository.findById(
        requester_id
      );

      if (!requesterExists) {
        throw new AppError('The requester informed does not exists.', 404);
      }
    }

    if (category_id) {
      const categoryExists = await this.categoriesRepository.findById(
        category_id
      );

      if (!categoryExists) {
        throw new AppError('The category informed does not exists.', 404);
      }
    }

    if (agent_id) {
      const agentExists = await this.agentsRepository.findById(agent_id);

      if (!agentExists) {
        throw new AppError('The agent informed does not exists.', 404);
      }
    }

    if (sector_id) {
      const sectorExists = await this.sectorsRepository.findById(sector_id);

      if (!sectorExists) {
        throw new AppError('The sector informed does not exists.', 404);
      }
    }

    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new AppError('Ticket not found.', 404);
    }

    const ticketUpdated = await this.ticketsRepository.update({
      id,
      agent_id,
      category_id,
      content,
      requester_id,
      sector_id,
      status,
      subject,
      read_status,
    });

    return ticketUpdated;
  }
}
