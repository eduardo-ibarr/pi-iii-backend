import { TicketsRepository } from '../infra/repositories/TicketsRepository';

export class ShowTicketService {
  constructor(private ticketsRepository: TicketsRepository) {}

  public async execute(id: string) {
    const ticket = await this.ticketsRepository.findById(id);
    return ticket;
  }
}
