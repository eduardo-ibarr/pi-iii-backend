import AppError from '../../../api/errors/AppError';
import { MessagesRepository } from '../infra/repositories/MessagesRepository';

export class ShowMessageService {
  constructor(private messagesRepository: MessagesRepository) {}

  public async execute(id: string) {
    const message = await this.messagesRepository.findById(id);

    if (!message) {
      throw new AppError('Message not found.', 404);
    }

    return message;
  }
}
