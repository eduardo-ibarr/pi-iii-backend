import { IConversationsRepository } from 'src/modules/conversation/domain/repositories/IConversationsRepository';
import AppError from '../../../api/errors/AppError';
import { ITicketsRepository } from '../domain/repositories/ITicketsRepository';
import { IDeleteTicketService } from '../domain/services';
import { IMessagesRepository } from 'src/modules/message/domain/repositories/IMessagesRepository';

export class DeleteTicketService implements IDeleteTicketService {
  constructor(
    private ticketsRepository: ITicketsRepository,
    private conversationsRepository: IConversationsRepository,
    private messagesRepository: IMessagesRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const ticket = await this.ticketsRepository.findById(id);

    if (!ticket) {
      throw new AppError('Ticket not found.');
    }

    const conversation = await this.conversationsRepository.findByTicket(
      ticket.id
    );

    if (!conversation) {
      throw new AppError('The ticket has none conversation.', 404);
    }

    const messagesByConversation =
      await this.messagesRepository.findByConversation(conversation.id);

    for await (const message of messagesByConversation) {
      await this.messagesRepository.remove(message.id);
    }

    await this.conversationsRepository.remove(conversation.id);
    await this.ticketsRepository.remove(ticket.id);
  }
}
