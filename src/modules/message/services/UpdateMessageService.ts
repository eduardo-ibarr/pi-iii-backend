import { IUpdateMessage } from '../domain/models';
import { MessagesRepository } from '../infra/repositories/MessagesRepository';

export class UpdateMessageService {
  constructor(private messagesRepository: MessagesRepository) {}

  public async execute({
    id,
    content,
    conversation_id,
    read_status,
    sender,
    ticket_id,
  }: IUpdateMessage & { id: string }): Promise<void> {
    const message = await this.messagesRepository.findById(id);

    if (!message) {
      throw new Error('Message not found.');
    }

    await this.messagesRepository.update({
      content,
      conversation_id,
      read_status,
      sender,
      ticket_id,
      id,
    });
  }
}
