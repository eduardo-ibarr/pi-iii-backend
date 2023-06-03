import { IResponseMessageDTO } from '../dtos';

export interface IListMessagesService {
  execute(): Promise<IResponseMessageDTO[]>;
}
