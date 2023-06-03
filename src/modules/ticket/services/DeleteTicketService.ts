import AppError from '../../../api/errors/AppError';
import { ITicketsRepository } from '../domain/repositories/ITicketsRepository';
import { IDeleteTicketService } from '../domain/services';

export class DeleteTicketService implements IDeleteTicketService {
  constructor(private ticketsRepository: ITicketsRepository) {}

  public async execute(id: string): Promise<void> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new AppError('Ticket not found.');
    }

    await this.ticketsRepository.remove(ticket.id);
  }
}
