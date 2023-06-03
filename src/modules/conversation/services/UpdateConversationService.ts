import AppError from '../../../api/errors/AppError';
import {
  IResponseConversationDTO,
  IUpdateConversationDTO,
} from '../domain/dtos';

import { IConversationsRepository } from '../domain/repositories/IConversationsRepository';
import { ITicketsRepository } from '../../../modules/ticket/domain/repositories/ITicketsRepository';
import { IUpdateConversationService } from '../domain/services';

export class UpdateConversationService implements IUpdateConversationService {
  constructor(
    private conversationsRepository: IConversationsRepository,
    private ticketsRepository: ITicketsRepository
  ) {}

  public async execute({
    id,
    ticket_id,
  }: IUpdateConversationDTO): Promise<IResponseConversationDTO> {
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

    const conversationUpdated = await this.conversationsRepository.update({
      ticket_id,
      id,
    });

    return conversationUpdated;
  }
}
