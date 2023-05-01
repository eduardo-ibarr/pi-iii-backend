import AppError from '../../../api/errors/AppError';
import { IAgentTicketHistory } from '../domain/models';
import { AgentTicketHistoriesRepository } from '../infra/repositories/AgentTicketHistoriesRepository';

export class ShowAgentTicketHistoryService {
  constructor(
    private agentTicketHistoriesRepository: AgentTicketHistoriesRepository
  ) {}

  public async execute(id: string): Promise<IAgentTicketHistory> {
    const agentTicketHistory =
      await this.agentTicketHistoriesRepository.findById(id);

    if (!agentTicketHistory) {
      throw new AppError('Agent-Ticket history not found.', 404);
    }

    return agentTicketHistory;
  }
}
