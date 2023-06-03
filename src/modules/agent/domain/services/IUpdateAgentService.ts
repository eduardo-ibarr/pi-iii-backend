import { IReturnAgentDTO, IUpdateAgentDTO } from '../dtos';

export interface IUpdateAgentService {
  execute(data: IUpdateAgentDTO): Promise<IReturnAgentDTO>;
}
