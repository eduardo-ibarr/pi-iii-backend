import {
  IConversation,
  ICreateConversation,
  IUpdateConversation,
} from '../models';

export interface IConversationsRepository {
  findById(id: string): Promise<IConversation | null>;
  delete(id: string): Promise<void>;
  list(): Promise<IConversation[]>;
  create({
    id_agent,
    id_requester,
    messages_amount,
    history,
  }: ICreateConversation): Promise<IConversation>;
  update({
    id_agent,
    id_requester,
    messages_amount,
    history,
  }: IUpdateConversation): Promise<void>;
}
