import AppError from '../../../api/errors/AppError';
import { IUpdateAgentTicketHistory } from '../domain/models';
import { AgentTicketHistoriesRepository } from '../infra/repositories/AgentTicketHistoriesRepository';

export class UpdateAgentTicketHistoryService {
  constructor(
    private agentTicketHistoriesRepository: AgentTicketHistoriesRepository
  ) {}

  public async execute({
    id,
    agent_id,
    ticket_id,
  }: IUpdateAgentTicketHistory & { id: string }): Promise<void> {
    const agentTicketHistory =
      await this.agentTicketHistoriesRepository.findById(id);

    if (!agentTicketHistory) {
      throw new AppError('Agent-Ticket history not found.', 404);
    }

    await this.agentTicketHistoriesRepository.update({
      id,
      agent_id,
      ticket_id,
    });
  }
}
