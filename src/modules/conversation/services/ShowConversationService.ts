import AppError from '../../../api/errors/AppError';
import { IResponseConversationDTO } from '../domain/dtos';
import { IConversationsRepository } from '../domain/repositories/IConversationsRepository';
import { IShowConversationService } from '../domain/services';

export class ShowConversationService implements IShowConversationService {
  constructor(private conversationsRepository: IConversationsRepository) {}

  public async execute(id: string): Promise<IResponseConversationDTO | null> {
    const conversation = await this.conversationsRepository.findById(id);

    if (!conversation) {
      throw new AppError('Conversation not found.', 404);
    }

    return conversation;
  }
}
