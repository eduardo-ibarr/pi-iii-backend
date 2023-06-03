import { IResponseTicketDTO } from '../domain/dtos';
import { ITicketsRepository } from '../domain/repositories/ITicketsRepository';
import { IListTicketsService } from '../domain/services';

export class ListTicketsService implements IListTicketsService {
  constructor(private ticketsRepository: ITicketsRepository) {}

  public async execute(): Promise<IResponseTicketDTO[]> {
    const tickets = await this.ticketsRepository.findAll();
    return tickets;
  }
}
