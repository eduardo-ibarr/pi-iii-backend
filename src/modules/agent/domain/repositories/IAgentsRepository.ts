import { IAgent, ICreateAgent, IUpdateAgent } from '../models';

export interface IAgentsRepository {
  findById(id: string): Promise<IAgent | null>;
  findByEmail(email: string): Promise<IAgent | null>;
  remove(id: string): Promise<any>;
  findAll(): Promise<IAgent[]>;
  create(data: ICreateAgent): Promise<IAgent>;
  update(data: IUpdateAgent): Promise<void>;
}
