import AppError from '../../../api/errors/AppError';
import { ConversationsRepository } from '../infra/repositories/ConversationsRepository';

export class ShowConversationService {
  constructor(private conversationsRepository: ConversationsRepository) {}

  public async execute(id: string) {
    const conversation = await this.conversationsRepository.findById(id);

    if (!conversation) {
      throw new AppError('Conversation not found.', 404);
    }

    return conversation;
  }
}
