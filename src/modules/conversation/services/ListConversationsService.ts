import { ConversationsRepository } from '../infra/repositories/ConversationsRepository';

export class ListConversationsService {
  constructor(private conversationsRepository: ConversationsRepository) {}

  public async execute() {
    const conversations = await this.conversationsRepository.findAll();
    return conversations;
  }
}
