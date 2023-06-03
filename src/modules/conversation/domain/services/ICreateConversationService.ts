import { IResponseConversationDTO, ICreateConversationDTO } from '../dtos';

export interface ICreateConversationService {
  execute(data: ICreateConversationDTO): Promise<IResponseConversationDTO>;
}
