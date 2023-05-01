import {
  IAgentTicketHistory,
  ICreateAgentTicketHistory,
} from '../domain/models';
import { AgentTicketHistoriesRepository } from '../infra/repositories/AgentTicketHistoriesRepository';

export class CreateAgentTicketHistoryService {
  constructor(
    private agentTicketHistoriesRepository: AgentTicketHistoriesRepository
  ) {}

  public async execute({
    agent_id,
    ticket_id,
  }: ICreateAgentTicketHistory): Promise<IAgentTicketHistory> {
    const agentTicketHistory = await this.agentTicketHistoriesRepository.create(
      {
        agent_id,
        ticket_id,
      }
    );

    return agentTicketHistory;
  }
}
