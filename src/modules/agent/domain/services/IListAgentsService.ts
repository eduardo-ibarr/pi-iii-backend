import { IReturnAgentDTO } from '../dtos';

export interface IListAgentsService {
  execute(): Promise<IReturnAgentDTO[]>;
}
