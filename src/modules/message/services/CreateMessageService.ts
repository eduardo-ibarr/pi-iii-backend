import AppError from '../../../api/errors/AppError';
import { ICreateMessageDTO, IResponseMessageDTO } from '../domain/dtos';

import { ICreateMessageService } from '../domain/services';
import { IConversationsRepository } from '../../conversation/domain/repositories/IConversationsRepository';
import { IMessagesRepository } from '../domain/repositories/IMessagesRepository';

export class CreateMessageService implements ICreateMessageService {
  constructor(
    private messagesRepository: IMessagesRepository,
    private conversationsRepository: IConversationsRepository
  ) {}

  public async execute({
    conversation_id,
    sender,
    content,
    read_status,
  }: ICreateMessageDTO): Promise<IResponseMessageDTO> {
    const conversationExists = await this.conversationsRepository.findById(
      conversation_id
    );

    if (!conversationExists) {
      throw new AppError('The conversation informed does not exists.', 404);
    }

    const message = await this.messagesRepository.create({
      conversation_id,
      sender,
      content,
      read_status,
    });

    return message;
  }
}
