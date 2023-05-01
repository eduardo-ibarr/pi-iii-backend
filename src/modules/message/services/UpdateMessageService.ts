import AppError from '../../../api/errors/AppError';
import { IUpdateMessage } from '../domain/models';

import { TicketsRepository } from '../../../modules/ticket/infra/repositories/TicketsRepository';
import { MessagesRepository } from '../infra/repositories/MessagesRepository';
import { ConversationsRepository } from '../../../modules/conversation/infra/repositories/ConversationsRepository';

export class UpdateMessageService {
  constructor(
    private messagesRepository: MessagesRepository,
    private ticketsRepository: TicketsRepository,
    private conversationsRepository: ConversationsRepository
  ) {}

  public async execute({
    id,
    content,
    conversation_id,
    read_status,
    sender,
    ticket_id,
  }: IUpdateMessage & { id: string }): Promise<void> {
    if (ticket_id) {
      const ticketExists = await this.ticketsRepository.findById(ticket_id);

      if (!ticketExists) {
        throw new AppError('The ticket informed does not exists.', 404);
      }
    }

    if (conversation_id) {
      const conversationExists = await this.conversationsRepository.findById(
        conversation_id
      );

      if (!conversationExists) {
        throw new AppError('The conversation informed does not exists.', 404);
      }
    }

    const message = await this.messagesRepository.findById(id);

    if (!message) {
      throw new AppError('Message not found.', 404);
    }

    await this.messagesRepository.update({
      content,
      conversation_id,
      read_status,
      sender,
      ticket_id,
      id,
    });
  }
}
