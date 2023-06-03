import { IResponseMessageDTO, IUpdateMessageDTO } from '../dtos';

export interface IUpdateMessageService {
  execute(data: IUpdateMessageDTO): Promise<IResponseMessageDTO>;
}
