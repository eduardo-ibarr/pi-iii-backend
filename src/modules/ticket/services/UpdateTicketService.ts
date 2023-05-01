import AppError from '../../../api/errors/AppError';
import { IUpdateTicket } from '../domain/models';
import { TicketsRepository } from '../infra/repositories/TicketsRepository';

export class UpdateTicketService {
  constructor(private ticketsRepository: TicketsRepository) {}

  public async execute({
    id,
    agent_id,
    category_id,
    content,
    requester_id,
    sector_id,
    status,
    subject,
    read_status,
  }: IUpdateTicket & { id: string }): Promise<void> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new AppError('Ticket not found.');
    }

    await this.ticketsRepository.update({
      id,
      agent_id,
      category_id,
      content,
      requester_id,
      sector_id,
      status,
      subject,
      read_status,
    });
  }
}
