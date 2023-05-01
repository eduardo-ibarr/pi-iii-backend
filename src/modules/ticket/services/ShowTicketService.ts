import AppError from '../../../api/errors/AppError';
import { TicketsRepository } from '../infra/repositories/TicketsRepository';

export class ShowTicketService {
  constructor(private ticketsRepository: TicketsRepository) {}

  public async execute(id: string) {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new AppError('Ticket not found.', 404);
    }

    return ticket;
  }
}
