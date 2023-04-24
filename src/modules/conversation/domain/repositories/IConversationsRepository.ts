import {
  IConversation,
  ICreateConversation,
  IUpdateConversation,
} from '../models';

export interface IConversationsRepository {
  findById(id: string): Promise<IConversation | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<IConversation[]>;
  create(data: ICreateConversation): Promise<IConversation>;
  update(data: IUpdateConversation): Promise<void>;
}
