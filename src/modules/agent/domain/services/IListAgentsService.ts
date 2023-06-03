import { IResponseAgentDTO } from '../dtos';

export interface IListAgentsService {
  execute(): Promise<IResponseAgentDTO[]>;
}
