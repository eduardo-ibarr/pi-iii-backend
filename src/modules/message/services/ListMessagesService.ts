import { IResponseMessageDTO } from '../domain/dtos';
import { IListMessagesService } from '../domain/services';
import { MessagesRepository } from '../infra/repositories/MessagesRepository';

export class ListMessagesService implements IListMessagesService {
  constructor(private messagesRepository: MessagesRepository) {}

  public async execute(): Promise<IResponseMessageDTO[]> {
    const messages = await this.messagesRepository.findAll();
    return messages;
  }
}
