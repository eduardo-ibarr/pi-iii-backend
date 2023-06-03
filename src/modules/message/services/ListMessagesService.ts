import { IResponseMessageDTO } from '../domain/dtos';
import { IMessagesRepository } from '../domain/repositories/IMessagesRepository';
import { IListMessagesService } from '../domain/services';

export class ListMessagesService implements IListMessagesService {
  constructor(private messagesRepository: IMessagesRepository) {}

  public async execute(): Promise<IResponseMessageDTO[]> {
    const messages = await this.messagesRepository.findAll();
    return messages;
  }
}
