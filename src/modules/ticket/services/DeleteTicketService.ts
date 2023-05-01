import AppError from '../../../api/errors/AppError';
import { TicketsRepository } from '../infra/repositories/TicketsRepository';

export class DeleteTicketService {
  constructor(private ticketsRepository: TicketsRepository) {}

  public async execute(id: string): Promise<void> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new AppError('Ticket not found.');
    }

    await this.ticketsRepository.remove(ticket.id);
  }
}
