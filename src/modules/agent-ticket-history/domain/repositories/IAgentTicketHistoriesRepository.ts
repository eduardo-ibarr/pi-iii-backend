import {
  IAgentTicketHistory,
  ICreateAgentTicketHistory,
  IUpdateAgentTicketHistory,
} from '../models';

export interface IAgentTicketHistoriesRepository {
  findById(id: string): Promise<IAgentTicketHistory | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<IAgentTicketHistory[]>;
  create(data: ICreateAgentTicketHistory): Promise<IAgentTicketHistory>;
  update(data: IUpdateAgentTicketHistory): Promise<void>;
}
