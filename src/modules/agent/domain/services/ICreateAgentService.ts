import { ICreateAgentDTO, IResponseAgentDTO } from '../dtos';

export interface ICreateAgentService {
  execute(data: ICreateAgentDTO): Promise<IResponseAgentDTO>;
}
