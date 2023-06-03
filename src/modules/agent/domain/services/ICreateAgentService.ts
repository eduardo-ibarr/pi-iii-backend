import { ICreateAgentDTO, IReturnAgentDTO } from '../dtos';

export interface ICreateAgentService {
  execute(data: ICreateAgentDTO): Promise<IReturnAgentDTO>;
}
