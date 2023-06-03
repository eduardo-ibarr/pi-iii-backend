import AppError from '../../../api/errors/AppError';
import { IMessagesRepository } from '../domain/repositories/IMessagesRepository';
import { IDeleteMessageService } from '../domain/services';

export class DeleteMessageService implements IDeleteMessageService {
  constructor(private messagesRepository: IMessagesRepository) {}

  public async execute(id: string): Promise<void> {
    const message = await this.messagesRepository.findById(id);

    if (!message) {
      throw new AppError('Message not found.', 404);
    }

    await this.messagesRepository.remove(message.id);
  }
}
