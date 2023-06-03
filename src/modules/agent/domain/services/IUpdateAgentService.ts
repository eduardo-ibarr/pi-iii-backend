import { IResponseAgentDTO, IUpdateAgentDTO } from '../dtos';

export interface IUpdateAgentService {
  execute(data: IUpdateAgentDTO): Promise<IResponseAgentDTO>;
}
