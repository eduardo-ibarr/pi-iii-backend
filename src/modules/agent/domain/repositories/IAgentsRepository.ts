import { IAgent, ICreateAgent, IUpdateAgent } from '../models';

export interface IAgentsRepository {
  findById(id: string): Promise<IAgent | null>;
  delete(id: string): Promise<void>;
  list(): Promise<IAgent[]>;
  create({
    name,
    password,
    email,
    tickets_finished,
    tickets_active,
  }: ICreateAgent): Promise<IAgent>;
  update({
    name,
    password,
    email,
    tickets_finished,
    tickets_active,
  }: IUpdateAgent): Promise<void>;
}
