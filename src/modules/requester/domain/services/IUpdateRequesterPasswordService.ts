import { IUpdateRequesterPasswordDTO } from '../dtos';

export interface IUpdateRequesterPasswordService {
  execute(data: IUpdateRequesterPasswordDTO): Promise<void>;
}
