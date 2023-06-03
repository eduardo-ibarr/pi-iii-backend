import { IResponseAgentDTO } from '../dtos';

export interface IShowAgentService {
  execute(id: string): Promise<IResponseAgentDTO | null>;
}
