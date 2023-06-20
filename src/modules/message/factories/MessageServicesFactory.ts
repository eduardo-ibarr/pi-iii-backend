import {
  ICreateMessageService,
  IListMessagesService,
  IShowMessageService,
  IDeleteMessageService,
  IUpdateMessageService,
} from '../domain/services';
import { MessagesRepository } from '../infra/repositories/MessagesRepository';
import {
  CreateMessageService,
  ListMessagesService,
  ShowMessageService,
  DeleteMessageService,
  UpdateMessageService,
} from '../services';
import { IMessageServicesFactory } from '../domain/factories/IMessageServicesFactory';
import { IMessagesRepository } from '../domain/repositories/IMessagesRepository';
import { IConversationsRepository } from '../../../modules/conversation/domain/repositories/IConversationsRepository';
import { ConversationsRepository } from '../../../modules/conversation/infra/repositories/ConversationsRepository';

export class MessageServicesFactory implements IMessageServicesFactory {
  private messagesRepository(): IMessagesRepository {
    return new MessagesRepository();
  }

  private conversationsRepository(): IConversationsRepository {
    return new ConversationsRepository();
  }

  public createMessageService(): ICreateMessageService {
    const messagesRepository = this.messagesRepository();
    const conversationsRepository = this.conversationsRepository();

    return new CreateMessageService(
      messagesRepository,
      conversationsRepository
    );
  }

  public listMessagesService(): IListMessagesService {
    const messagesRepository = this.messagesRepository();

    return new ListMessagesService(messagesRepository);
  }

  public showMessageService(): IShowMessageService {
    const messagesRepository = this.messagesRepository();

    return new ShowMessageService(messagesRepository);
  }

  public deleteMessageService(): IDeleteMessageService {
    const messagesRepository = this.messagesRepository();

    return new DeleteMessageService(messagesRepository);
  }

  public updateMessageService(): IUpdateMessageService {
    const messagesRepository = this.messagesRepository();
    const conversationsRepository = this.conversationsRepository();

    return new UpdateMessageService(
      messagesRepository,
      conversationsRepository
    );
  }
}
