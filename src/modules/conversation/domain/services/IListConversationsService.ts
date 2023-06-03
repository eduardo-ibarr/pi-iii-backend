import { IResponseConversationDTO } from '../dtos';

export interface IListConversationsService {
  execute(): Promise<IResponseConversationDTO[]>;
}
