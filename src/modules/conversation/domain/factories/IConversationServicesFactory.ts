import {
  ICreateConversationService,
  IListConversationsService,
  IShowConversationService,
  IDeleteConversationService,
  IUpdateConversationService,
} from '../services';

export interface IConversationServicesFactory {
  createConversationService(): ICreateConversationService;
  listConversationsService(): IListConversationsService;
  showConversationService(): IShowConversationService;
  deleteConversationService(): IDeleteConversationService;
  updateConversationService(): IUpdateConversationService;
}
