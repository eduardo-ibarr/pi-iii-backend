import AppError from '../../../api/errors/AppError';
import { IResponseMessageDTO } from '../domain/dtos';
import { IMessagesRepository } from '../domain/repositories/IMessagesRepository';

export class ShowMessageService {
  constructor(private messagesRepository: IMessagesRepository) {}

  public async execute(id: string): Promise<IResponseMessageDTO | null> {
    const message = await this.messagesRepository.findById(id);

    if (!message) {
      throw new AppError('Message not found.', 404);
    }

    return message;
  }
}
