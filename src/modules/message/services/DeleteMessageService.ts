import AppError from '../../../api/errors/AppError';
import { IDeleteMessageService } from '../domain/services';
import { MessagesRepository } from '../infra/repositories/MessagesRepository';

export class DeleteMessageService implements IDeleteMessageService {
  constructor(private messagesRepository: MessagesRepository) {}

  public async execute(id: string): Promise<void> {
    const message = await this.messagesRepository.findById(id);

    if (!message) {
      throw new AppError('Message not found.', 404);
    }

    await this.messagesRepository.remove(message.id);
  }
}
