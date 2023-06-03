import AppError from '../../../api/errors/AppError';
import { IResponseTicketDTO } from '../domain/dtos';
import { ITicketsRepository } from '../domain/repositories/ITicketsRepository';
import { IShowTicketService } from '../domain/services';

export class ShowTicketService implements IShowTicketService {
  constructor(private ticketsRepository: ITicketsRepository) {}

  public async execute(id: string): Promise<IResponseTicketDTO | null> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new AppError('Ticket not found.', 404);
    }

    return ticket;
  }
}
