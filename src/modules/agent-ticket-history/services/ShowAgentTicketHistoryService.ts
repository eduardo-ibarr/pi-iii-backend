import { IAgentTicketHistory } from '../domain/models';
import { AgentTicketHistoryRepository } from '../infra/repositories/AgentTicketHistoryRepository';

export class ShowAgentTicketHistoryService {
  constructor(
    private agentTicketHistoryRepository: AgentTicketHistoryRepository
  ) {}

  public async execute(id: string): Promise<IAgentTicketHistory> {
    const agentTicketHistory = await this.agentTicketHistoryRepository.findById(
      id
    );

    if (!agentTicketHistory) {
      throw new Error('AgentTicketHistory not found.');
    }

    return agentTicketHistory;
  }
}
