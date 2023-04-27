import { IUpdateConversation } from '../domain/models';
import { ConversationsRepository } from '../infra/repositories/ConversationsRepository';

export class UpdateConversationService {
  constructor(private conversationsRepository: ConversationsRepository) {}

  public async execute({
    id,
    agent_id,
    ticket_id,
  }: IUpdateConversation & { id: string }): Promise<void> {
    const conversation = await this.conversationsRepository.findById(id);

    if (!conversation) {
      throw new Error('Conversation not found.');
    }

    await this.conversationsRepository.update({
      agent_id,
      ticket_id,
      id,
    });
  }
}
