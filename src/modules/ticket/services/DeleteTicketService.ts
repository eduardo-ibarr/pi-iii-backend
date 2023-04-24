import { TicketsRepository } from '../infra/repositories/TicketsRepository';

export class DeleteTicketservice {
  constructor(private ticketsRepository: TicketsRepository) {}

  public async execute(id: string): Promise<void> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new Error('Ticket not found.');
    }

    await this.ticketsRepository.remove(ticket.id);
  }
}
