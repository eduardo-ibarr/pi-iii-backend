import { IResponseMessageDTO } from '../dtos';

export interface IShowMessageService {
  execute(id: string): Promise<IResponseMessageDTO | null>;
}
