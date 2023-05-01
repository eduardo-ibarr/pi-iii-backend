import { ICreateTicket } from '../domain/models';
import { TicketsRepository } from '../infra/repositories/TicketsRepository';

export class CreateTicketService {
  constructor(private ticketsRepository: TicketsRepository) {}

  public async execute({
    requester_id,
    category_id,
    agent_id,
    sector_id,
    status,
    subject,
    content,
    read_status,
  }: ICreateTicket) {
    const ticket = await this.ticketsRepository.create({
      requester_id,
      category_id,
      agent_id,
      sector_id,
      status,
      subject,
      content,
      read_status,
    });

    return ticket;
  }
}
