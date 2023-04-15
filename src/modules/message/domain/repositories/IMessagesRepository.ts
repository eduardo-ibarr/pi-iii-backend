import { IMessage, ICreateMessage, IUpdateMessage } from '../models';

export interface IMessagesRepository {
  findById(id: string): Promise<IMessage | null>;
  delete(id: string): Promise<void>;
  list(): Promise<IMessage[]>;
  create({
    content,
    author,
    type_of_author,
  }: ICreateMessage): Promise<IMessage>;
  update({ content, author, type_of_author }: IUpdateMessage): Promise<void>;
}
