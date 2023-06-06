import { IUpdateAgentPasswordDTO } from '../dtos';

export interface IUpdateAgentPasswordService {
  execute(data: IUpdateAgentPasswordDTO): Promise<void>;
}
