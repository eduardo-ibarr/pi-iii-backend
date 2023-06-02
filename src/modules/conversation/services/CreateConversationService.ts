import AppError from '../../../api/errors/AppError';
import { ICreateConversation } from '../domain/models';

import { AgentsRepository } from '../../../modules/agent/infra/repositories/AgentsRepository';
import { TicketsRepository } from '../../../modules/ticket/infra/repositories/TicketsRepository';
import { ConversationsRepository } from '../infra/repositories/ConversationsRepository';

export class CreateConversationService {
  constructor(
    private conversationsRepository: ConversationsRepository,
    private ticketsRepository: TicketsRepository
  ) {}

  public async execute({ ticket_id }: ICreateConversation) {
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
