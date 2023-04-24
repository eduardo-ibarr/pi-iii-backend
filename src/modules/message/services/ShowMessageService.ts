import { MessagesRepository } from '../infra/repositories/MessagesRepository';

export class ShowMessageService {
  constructor(private messagesRepository: MessagesRepository) {}

  public async execute(id: string) {
    const message = await this.messagesRepository.findById(id);
    return message;
  }
}
