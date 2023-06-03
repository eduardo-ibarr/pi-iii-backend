import AppError from '../../../api/errors/AppError';
import { IDeleteConversationService } from '../domain/services';
import { ConversationsRepository } from '../infra/repositories/ConversationsRepository';

export class DeleteConversationService implements IDeleteConversationService {
  constructor(private conversationsRepository: ConversationsRepository) {}

  public async execute(id: string): Promise<void> {
    const conversation = await this.conversationsRepository.findById(id);

    if (!conversation) {
      throw new AppError('Conversation not found.', 404);
    }

    await this.conversationsRepository.remove(conversation.id);
  }
}
