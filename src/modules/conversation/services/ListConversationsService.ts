import { IResponseConversationDTO } from '../domain/dtos';
import { IListConversationsService } from '../domain/services';
import { ConversationsRepository } from '../infra/repositories/ConversationsRepository';

export class ListConversationsService implements IListConversationsService {
  constructor(private conversationsRepository: ConversationsRepository) {}

  public async execute(): Promise<IResponseConversationDTO[]> {
    const conversations = await this.conversationsRepository.findAll();
    return conversations;
  }
}
