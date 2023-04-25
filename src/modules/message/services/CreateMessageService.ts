import { ICreateMessage } from '../domain/models';
import { MessagesRepository } from '../infra/repositories/MessagesRepository';

export class CreateMessageService {
  constructor(private messagesRepository: MessagesRepository) {}

  public async execute({
    ticket_id,
    conversation_id,
    sender,
    content,
    read_status,
  }: ICreateMessage) {
    const message = await this.messagesRepository.create({
      ticket_id,
      conversation_id,
      sender,
      content,
      read_status,
    });

    return message;
  }
}
