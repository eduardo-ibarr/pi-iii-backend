import AppError from '../../../api/errors/AppError';
import { AgentTicketHistoriesRepository } from '../infra/repositories/AgentTicketHistoriesRepository';

export class DeleteAgentTicketHistoryService {
  constructor(
    private agentTicketHistoriesRepository: AgentTicketHistoriesRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const agentTicketHistory =
      await this.agentTicketHistoriesRepository.findById(id);

    if (!agentTicketHistory) {
      throw new AppError('Agent-Ticket history not found.', 404);
    }

    await this.agentTicketHistoriesRepository.remove(agentTicketHistory.id);
  }
}
