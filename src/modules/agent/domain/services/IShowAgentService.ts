import { IReturnAgentDTO } from '../dtos';

export interface IShowAgentService {
  execute(id: string): Promise<IReturnAgentDTO>;
}
