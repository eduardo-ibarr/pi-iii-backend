import {
  IAgentTicketHistory,
  ICreateAgentTicketHistory,
  IUpdateAgentTicketHistory,
} from '../models';

export interface IAgentTicketHistoryRepository {
  findById(id: string): Promise<IAgentTicketHistory | null>;
  findByEmail(email: string): Promise<IAgentTicketHistory | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<IAgentTicketHistory[]>;
  create(data: ICreateAgentTicketHistory): Promise<IAgentTicketHistory>;
  update(data: IUpdateAgentTicketHistory): Promise<void>;
}
