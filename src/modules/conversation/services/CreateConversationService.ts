import AppError from '../../../api/errors/AppError';
import { ICreateConversationDTO } from '../domain/dtos';

import { ICreateConversationService } from '../domain/services';
import { IConversationsRepository } from '../domain/repositories/IConversationsRepository';
import { ITicketsRepository } from '../../ticket/domain/repositories/ITicketsRepository';

export class CreateConversationService implements ICreateConversationService {
  constructor(
    private conversationsRepository: IConversationsRepository,
    private ticketsRepository: ITicketsRepository
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
