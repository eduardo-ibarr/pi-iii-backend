import { MessagesRepository } from '../infra/repositories/MessagesRepository';

export class DeleteMessageService {
  constructor(private messagesRepository: MessagesRepository) {}

  public async execute(id: string): Promise<void> {
    const message = await this.messagesRepository.findById(id);

    if (!message) {
      throw new Error('Message not found.');
    }

    await this.messagesRepository.remove(message.id);
  }
}
