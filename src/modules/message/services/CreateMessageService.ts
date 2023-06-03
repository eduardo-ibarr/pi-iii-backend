import AppError from '../../../api/errors/AppError';
import { ICreateMessageDTO, IResponseMessageDTO } from '../domain/dtos';

import { ICreateMessageService } from '../domain/services';
import { IConversationsRepository } from '../../conversation/domain/repositories/IConversationsRepository';
import { ITicketsRepository } from '../../ticket/domain/repositories/ITicketsRepository';
import { IMessagesRepository } from '../domain/repositories/IMessagesRepository';

export class CreateMessageService implements ICreateMessageService {
  constructor(
    private messagesRepository: IMessagesRepository,
    private ticketsRepository: ITicketsRepository,
    private conversationsRepository: IConversationsRepository
  ) {}

  public async execute({
    ticket_id,
    conversation_id,
    sender,
    content,
    read_status,
  }: ICreateMessageDTO): Promise<IResponseMessageDTO> {
    const ticketExists = await this.ticketsRepository.findById(ticket_id);

    if (!ticketExists) {
      throw new AppError('The ticket informed does not exists.', 404);
    }

    const conversationExists = await this.conversationsRepository.findById(
      conversation_id
    );

    if (!conversationExists) {
      throw new AppError('The conversation informed does not exists.', 404);
    }

    const message = await this.messagesRepository.create({
      ticket_id,
      conversation_id,
      sender,
      content,
      read_status,
    });

    return message;
  }
}
