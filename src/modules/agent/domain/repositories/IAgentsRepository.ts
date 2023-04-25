import { IAgent, ICreateAgent, IUpdateAgent } from '../models';

export interface IAgentsRepository {
  findById(id: string): Promise<IAgent | null>;
  findByEmail(email: string): Promise<IAgent | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<IAgent[]>;
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
