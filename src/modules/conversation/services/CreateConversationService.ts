import AppError from '../../../api/errors/AppError';
import { ICreateConversationDTO } from '../domain/dtos';

import { TicketsRepository } from '../../../modules/ticket/infra/repositories/TicketsRepository';
import { ConversationsRepository } from '../infra/repositories/ConversationsRepository';
import { ICreateConversationService } from '../domain/services';

export class CreateConversationService implements ICreateConversationService {
  constructor(
    private conversationsRepository: ConversationsRepository,
    private ticketsRepository: TicketsRepository
  ) {}

  public async execute({ ticket_id }: ICreateConversationDTO) {
    const ticketExists = await this.ticketsRepository.findById(ticket_id);

    if (!ticketExists) {
      throw new AppError('The ticket informed does not exists.', 404);
    }

    const conversation = await this.conversationsRepository.create({
      ticket_id,
    });

    return conversation;
  }
}
