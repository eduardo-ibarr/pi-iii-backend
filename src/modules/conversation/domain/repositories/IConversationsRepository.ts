import {
  ICreateConversationDTO,
  IResponseConversationDTO,
  IUpdateConversationDTO,
} from '../dtos';

export interface IConversationsRepository {
  findById(id: string): Promise<IResponseConversationDTO | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<IResponseConversationDTO[]>;
  create(data: ICreateConversationDTO): Promise<IResponseConversationDTO>;
  update(data: IUpdateConversationDTO): Promise<IResponseConversationDTO>;
}
