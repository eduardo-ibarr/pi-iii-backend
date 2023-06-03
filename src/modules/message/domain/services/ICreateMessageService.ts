import { IResponseMessageDTO, ICreateMessageDTO } from '../dtos';

export interface ICreateMessageService {
  execute(data: ICreateMessageDTO): Promise<IResponseMessageDTO>;
}
