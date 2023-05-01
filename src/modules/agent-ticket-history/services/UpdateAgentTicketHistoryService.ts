import AppError from '../../../api/errors/AppError';
import { IUpdateAgentTicketHistory } from '../domain/models';

import { TicketsRepository } from '../../../modules/ticket/infra/repositories/TicketsRepository';
import { AgentsRepository } from '../../../modules/agent/infra/repositories/AgentsRepository';
import { AgentTicketHistoriesRepository } from '../infra/repositories/AgentTicketHistoriesRepository';

export class UpdateAgentTicketHistoryService {
  constructor(
    private agentTicketHistoriesRepository: AgentTicketHistoriesRepository,
    private ticketsRepository: TicketsRepository,
    private agentsRepository: AgentsRepository
  ) {}

  public async execute({
    id,
    agent_id,
    ticket_id,
  }: IUpdateAgentTicketHistory & { id: string }): Promise<void> {
    if (agent_id) {
      const agentExists = await this.agentsRepository.findById(agent_id);

      if (!agentExists) {
        throw new AppError('The agent informed does not exists.', 404);
      }
    }

    if (ticket_id) {
      const ticketExists = await this.ticketsRepository.findById(ticket_id);

      if (!ticketExists) {
        throw new AppError('The ticket informed does not exists.', 404);
      }
    }

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
