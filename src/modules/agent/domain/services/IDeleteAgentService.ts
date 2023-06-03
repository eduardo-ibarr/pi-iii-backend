import { IReturnAgentDTO } from '../dtos';

export interface IDeleteAgentService {
  execute(id: string): Promise<IReturnAgentDTO>;
}
