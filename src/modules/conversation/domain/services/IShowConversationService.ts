import { IResponseConversationDTO } from '../dtos';

export interface IShowConversationService {
  execute(id: string): Promise<IResponseConversationDTO | null>;
}
