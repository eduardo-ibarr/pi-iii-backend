import { IAgentTicketHistory } from '../domain/models';
import { AgentTicketHistoryRepository } from '../infra/repositories/AgentTicketHistoryRepository';

export class ListAgentTicketHistoryService {
  constructor(
    private agentTicketHistoryRepository: AgentTicketHistoryRepository
  ) {}

  public async execute(): Promise<IAgentTicketHistory[]> {
    const agentTicketHistories =
      await this.agentTicketHistoryRepository.findAll();
    return agentTicketHistories;
  }
}
