import { IMessage, ICreateMessage, IUpdateMessage } from '../models';

export interface IMessagesRepository {
  findById(id: string): Promise<IMessage | null>;
  findAll(): Promise<IMessage[]>;
  remove(id: string): Promise<void>;
  update({ content, author, type_of_author }: IUpdateMessage): Promise<void>;
  create({
    content,
    author,
    type_of_author,
  }: ICreateMessage): Promise<IMessage>;
}
