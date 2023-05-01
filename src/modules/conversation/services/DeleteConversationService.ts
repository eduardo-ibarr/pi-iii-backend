import { ConversationsRepository } from '../infra/repositories/ConversationsRepository';

export class DeleteConversationService {
  constructor(private conversationsRepository: ConversationsRepository) {}

  public async execute(id: string): Promise<void> {
    const conversation = await this.conversationsRepository.findById(id);

    if (!conversation) {
      throw new Error('Conversation not found.');
    }

    await this.conversationsRepository.remove(conversation.id);
  }
}
