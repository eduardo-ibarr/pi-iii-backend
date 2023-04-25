import { TicketsRepository } from '../infra/repositories/TicketsRepository';

export class ListTicketsService {
  constructor(private ticketsRepository: TicketsRepository) {}

  public async execute() {
    const tickets = await this.ticketsRepository.findAll();
    return tickets;
  }
}
