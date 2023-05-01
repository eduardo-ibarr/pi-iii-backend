import AppError from '../../../api/errors/AppError';
import {
  IAgentTicketHistory,
  ICreateAgentTicketHistory,
} from '../domain/models';

import { TicketsRepository } from '../../../modules/ticket/infra/repositories/TicketsRepository';
import { AgentsRepository } from '../../../modules/agent/infra/repositories/AgentsRepository';
import { AgentTicketHistoriesRepository } from '../infra/repositories/AgentTicketHistoriesRepository';

export class CreateAgentTicketHistoryService {
  constructor(
    private agentTicketHistoriesRepository: AgentTicketHistoriesRepository,
    private ticketsRepository: TicketsRepository,
    private agentsRepository: AgentsRepository
  ) {}

  public async execute({
    agent_id,
    ticket_id,
  }: ICreateAgentTicketHistory): Promise<IAgentTicketHistory> {
    const agentExists = await this.agentsRepository.findById(agent_id);

    if (!agentExists) {
      throw new AppError('The agent informed does not exists.', 404);
    }

    const ticketExists = await this.ticketsRepository.findById(ticket_id);

    if (!ticketExists) {
      throw new AppError('The ticket informed does not exists.', 404);
    }

    const agentTicketHistory = await this.agentTicketHistoriesRepository.create(
      {
        agent_id,
        ticket_id,
      }
    );

    return agentTicketHistory;
  }
}
