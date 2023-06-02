import AppError from '../../../api/errors/AppError';
import { IUpdateConversation } from '../domain/models';

import { AgentsRepository } from '../../../modules/agent/infra/repositories/AgentsRepository';
import { TicketsRepository } from '../../../modules/ticket/infra/repositories/TicketsRepository';
import { ConversationsRepository } from '../infra/repositories/ConversationsRepository';

export class UpdateConversationService {
  constructor(
    private conversationsRepository: ConversationsRepository,
    private ticketsRepository: TicketsRepository,
    private agentsRepository: AgentsRepository
  ) {}

  public async execute({
    id,
    ticket_id,
  }: IUpdateConversation & { id: string }): Promise<void> {
    if (ticket_id) {
      const ticketExists = await this.ticketsRepository.findById(ticket_id);

      if (!ticketExists) {
        throw new AppError('The ticket informed does not exists.', 404);
      }
    }

    const conversation = await this.conversationsRepository.findById(id);

    if (!conversation) {
      throw new AppError('Conversation not found.', 404);
    }

    await this.conversationsRepository.update({
      ticket_id,
      id,
    });
  }
}
