import { IListConversationsService } from '../domain/services';
import { ConversationsRepository } from '../infra/repositories/ConversationsRepository';

export class ListConversationsService implements IListConversationsService {
  constructor(private conversationsRepository: ConversationsRepository) {}

  public async execute() {
    const conversations = await this.conversationsRepository.findAll();
    return conversations;
  }
}
