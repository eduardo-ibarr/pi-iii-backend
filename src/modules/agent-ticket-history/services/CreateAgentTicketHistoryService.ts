import {
  IAgentTicketHistory,
  ICreateAgentTicketHistory,
} from '../domain/models';
import { AgentTicketHistoryRepository } from '../infra/repositories/AgentTicketHistoryRepository';

export class CreateAgentTicketHistoryService {
  constructor(
    private agentTicketHistoryRepository: AgentTicketHistoryRepository
  ) {}

  public async execute({
    agent_id,
    ticket_id,
  }: ICreateAgentTicketHistory): Promise<IAgentTicketHistory> {
    const agentTicketHistory = await this.agentTicketHistoryRepository.create({
      agent_id,
      ticket_id,
    });

    return agentTicketHistory;
  }
}
