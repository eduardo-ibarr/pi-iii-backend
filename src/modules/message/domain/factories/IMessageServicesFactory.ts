import {
  ICreateMessageService,
  IListMessagesService,
  IShowMessageService,
  IDeleteMessageService,
  IUpdateMessageService,
} from '../services';

export interface IMessageServicesFactory {
  createMessageService(): ICreateMessageService;
  listMessagesService(): IListMessagesService;
  showMessageService(): IShowMessageService;
  deleteMessageService(): IDeleteMessageService;
  updateMessageService(): IUpdateMessageService;
}
