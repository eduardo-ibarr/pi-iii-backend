import { ITicketsRepository } from '../domain/repositories/ITicketsRepository';
import {
  ICreateTicketService,
  IListTicketsService,
  IShowTicketService,
  IDeleteTicketService,
  IUpdateTicketService,
} from '../domain/services';
import {
  CreateTicketService,
  ListTicketsService,
  ShowTicketService,
  DeleteTicketService,
  UpdateTicketService,
} from '../services';
import { ITicketServicesFactory } from '../domain/factories/ITicketServicesFactory';
import { TicketsRepository } from '../infra/repositories/TicketsRepository';
import { IRequestersRepository } from '../../../modules/requester/domain/repositories/IRequestersRepository';
import { RequestersRepository } from '../../../modules/requester/infra/repositories/RequestersRepository';
import { ICategoriesRepository } from '../../../modules/category/domain/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../../modules/category/infra/repositories/CategoriesRepository';
import { ISectorsRepository } from '../../../modules/sector/domain/repositories/ISectorsRepository';
import { SectorsRepository } from '../../../modules/sector/infra/repositories/SectorsRepository';
import { AgentsRepository } from '../../../modules/agent/infra/repositories/AgentsRepository';
import { IAgentsRepository } from '../../../modules/agent/domain/repositories/IAgentsRepository';

export class TicketServicesFactory implements ITicketServicesFactory {
  private ticketsRepository(): ITicketsRepository {
    return new TicketsRepository();
  }

  private requestersRepository(): IRequestersRepository {
    return new RequestersRepository();
  }

  private categoriesRepository(): ICategoriesRepository {
    return new CategoriesRepository();
  }

  private sectorsRepository(): ISectorsRepository {
    return new SectorsRepository();
  }

  private agentsRepository(): IAgentsRepository {
    return new AgentsRepository();
  }

  public createTicketService(): ICreateTicketService {
    const ticketsRepository = this.ticketsRepository();
    const requestersRepository = this.requestersRepository();
    const categoriesRepository = this.categoriesRepository();
    const sectorsRepository = this.sectorsRepository();

    return new CreateTicketService(
      ticketsRepository,
      requestersRepository,
      categoriesRepository,
      sectorsRepository
    );
  }

  public listTicketsService(): IListTicketsService {
    const ticketsRepository = this.ticketsRepository();

    return new ListTicketsService(ticketsRepository);
  }

  public showTicketService(): IShowTicketService {
    const ticketsRepository = this.ticketsRepository();

    return new ShowTicketService(ticketsRepository);
  }

  public deleteTicketService(): IDeleteTicketService {
    const ticketsRepository = this.ticketsRepository();

    return new DeleteTicketService(ticketsRepository);
  }

  public updateTicketService(): IUpdateTicketService {
    const ticketsRepository = this.ticketsRepository();
    const requestersRepository = this.requestersRepository();
    const categoriesRepository = this.categoriesRepository();
    const sectorsRepository = this.sectorsRepository();
    const agentsRepository = this.agentsRepository();

    return new UpdateTicketService(
      ticketsRepository,
      requestersRepository,
      categoriesRepository,
      agentsRepository,
      sectorsRepository
    );
  }
}
