import AppError from '../../../api/errors/AppError';
import { IConversationsRepository } from '../domain/repositories/IConversationsRepository';
import { IDeleteConversationService } from '../domain/services';

export class DeleteConversationService implements IDeleteConversationService {
  constructor(private conversationsRepository: IConversationsRepository) {}

  public async execute(id: string): Promise<void> {
    const conversation = await this.conversationsRepository.findById(id);

    if (!conversation) {
      throw new AppError('Conversation not found.', 404);
    }

    await this.conversationsRepository.remove(conversation.id);
  }
}
