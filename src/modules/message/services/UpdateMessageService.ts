import AppError from '../../../api/errors/AppError';
import { IResponseMessageDTO, IUpdateMessageDTO } from '../domain/dtos';

import { IConversationsRepository } from '../../conversation/domain/repositories/IConversationsRepository';
import { IMessagesRepository } from '../domain/repositories/IMessagesRepository';

export class UpdateMessageService {
  constructor(
    private messagesRepository: IMessagesRepository,
    private conversationsRepository: IConversationsRepository
  ) {}

  public async execute({
    id,
    content,
    conversation_id,
    read_status,
    sender,
  }: IUpdateMessageDTO): Promise<IResponseMessageDTO> {
    if (conversation_id) {
      const conversationExists = await this.conversationsRepository.findById(
        conversation_id
      );

      if (!conversationExists) {
        throw new AppError('The conversation informed does not exists.', 404);
      }
    }

    const message = await this.messagesRepository.findById(id);

    if (!message) {
      throw new AppError('Message not found.', 404);
    }

    const messageUpdated = await this.messagesRepository.update({
      content,
      conversation_id,
      read_status,
      sender,
      id,
    });

    return messageUpdated;
  }
}
