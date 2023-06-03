import { IResponseConversationDTO, IUpdateConversationDTO } from '../dtos';

export interface IUpdateConversationService {
  execute(data: IUpdateConversationDTO): Promise<IResponseConversationDTO>;
}
