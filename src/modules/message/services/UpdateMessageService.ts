import AppError from '../../../api/errors/AppError';
import { IResponseMessageDTO, IUpdateMessageDTO } from '../domain/dtos';

import { IConversationsRepository } from '../../conversation/domain/repositories/IConversationsRepository';
import { ITicketsRepository } from '../../ticket/domain/repositories/ITicketsRepository';
import { IMessagesRepository } from '../domain/repositories/IMessagesRepository';

export class UpdateMessageService {
  constructor(
    private messagesRepository: IMessagesRepository,
    private ticketsRepository: ITicketsRepository,
    private conversationsRepository: IConversationsRepository
  ) {}

  public async execute({
    id,
    content,
    conversation_id,
    read_status,
    sender,
    ticket_id,
  }: IUpdateMessageDTO): Promise<IResponseMessageDTO> {
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

    const messageUpdated = await this.messagesRepository.update({
      content,
      conversation_id,
      read_status,
      sender,
      ticket_id,
      id,
    });

    return messageUpdated;
  }
}
