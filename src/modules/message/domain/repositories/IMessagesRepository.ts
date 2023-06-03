import {
  ICreateMessageDTO,
  IResponseMessageDTO,
  IUpdateMessageDTO,
} from '../dtos';

export interface IMessagesRepository {
  findById(id: string): Promise<IResponseMessageDTO | null>;
  findAll(): Promise<IResponseMessageDTO[]>;
  findByConversation(id: string): Promise<IResponseMessageDTO[]>;
  remove(id: string): Promise<void>;
  update(data: IUpdateMessageDTO): Promise<IResponseMessageDTO>;
  create(data: ICreateMessageDTO): Promise<IResponseMessageDTO>;
}
