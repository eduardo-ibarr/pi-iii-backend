import { ITicket, ICreateTicket, IUpdateTicket } from '../models';

export interface ITicketsRepository {
  findById(id: string): Promise<ITicket | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<ITicket[]>;
  create(data: ICreateTicket): Promise<ITicket>;
  update(data: IUpdateTicket): Promise<void>;
}
