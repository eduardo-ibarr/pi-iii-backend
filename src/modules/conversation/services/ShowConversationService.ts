import { ConversationsRepository } from '../infra/repositories/ConversationsRepository';

export class ShowConversationService {
  constructor(private conversationsRepository: ConversationsRepository) {}

  public async execute(id: string) {
    const conversation = await this.conversationsRepository.findById(id);
    return conversation;
  }
}
