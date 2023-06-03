import {
  ICreateConversationService,
  IListConversationsService,
  IShowConversationService,
  IDeleteConversationService,
  IUpdateConversationService,
} from '../domain/services';
import { ConversationsRepository } from '../infra/repositories/ConversationsRepository';
import {
  CreateConversationService,
  ListConversationsService,
  ShowConversationService,
  DeleteConversationService,
  UpdateConversationService,
} from '../services';
import { IConversationServicesFactory } from '../domain/factories/IConversationServicesFactory';
import { IConversationsRepository } from '../domain/repositories/IConversationsRepository';
import { ITicketsRepository } from '../../ticket/domain/repositories/ITicketsRepository';
import { TicketsRepository } from '../../ticket/infra/repositories/TicketsRepository';

export class ConversationServicesFactory
  implements IConversationServicesFactory
{
  private conversationsRepository(): IConversationsRepository {
    return new ConversationsRepository();
  }

  private ticketsRepository(): ITicketsRepository {
    return new TicketsRepository();
  }

  public createConversationService(): ICreateConversationService {
    const conversationsRepository = this.conversationsRepository();
    const ticketsRepository = this.ticketsRepository();

    return new CreateConversationService(
      conversationsRepository,
      ticketsRepository
    );
  }

  public listConversationsService(): IListConversationsService {
    const conversationsRepository = this.conversationsRepository();

    return new ListConversationsService(conversationsRepository);
  }

  public showConversationService(): IShowConversationService {
    const conversationsRepository = this.conversationsRepository();

    return new ShowConversationService(conversationsRepository);
  }

  public deleteConversationService(): IDeleteConversationService {
    const conversationsRepository = this.conversationsRepository();

    return new DeleteConversationService(conversationsRepository);
  }

  public updateConversationService(): IUpdateConversationService {
    const conversationsRepository = this.conversationsRepository();
    const ticketsRepository = this.ticketsRepository();

    return new UpdateConversationService(
      conversationsRepository,
      ticketsRepository
    );
  }
}
