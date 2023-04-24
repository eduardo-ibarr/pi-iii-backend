import { IMessage, ICreateMessage, IUpdateMessage } from '../models';

export interface IMessagesRepository {
  findById(id: string): Promise<IMessage | null>;
  findAll(): Promise<IMessage[]>;
  remove(id: string): Promise<void>;
  update(data: IUpdateMessage): Promise<void>;
  create(data: ICreateMessage): Promise<IMessage>;
}
