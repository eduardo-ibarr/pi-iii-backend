import { IAgentPasswordDTO } from '../dtos';

export interface IGetAgentPasswordService {
  execute(id: string): Promise<IAgentPasswordDTO | null>;
}
