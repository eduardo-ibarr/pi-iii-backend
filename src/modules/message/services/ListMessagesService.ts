import { MessagesRepository } from '../infra/repositories/MessagesRepository';

export class ListMessagesService {
  constructor(private messagesRepository: MessagesRepository) {}

  public async execute() {
    const messages = await this.messagesRepository.findAll();
    return messages;
  }
}
