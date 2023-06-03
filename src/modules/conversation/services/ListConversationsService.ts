import { IResponseConversationDTO } from '../domain/dtos';
import { IConversationsRepository } from '../domain/repositories/IConversationsRepository';
import { IListConversationsService } from '../domain/services';

export class ListConversationsService implements IListConversationsService {
  constructor(private conversationsRepository: IConversationsRepository) {}

  public async execute(): Promise<IResponseConversationDTO[]> {
    const conversations = await this.conversationsRepository.findAll();
    return conversations;
  }
}
