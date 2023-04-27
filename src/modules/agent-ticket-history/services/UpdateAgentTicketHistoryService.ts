import { IUpdateAgentTicketHistory } from '../domain/models';
import { AgentTicketHistoryRepository } from '../infra/repositories/AgentTicketHistoryRepository';

export class UpdateAgentTicketHistoryService {
  constructor(
    private agentTicketHistoryRepository: AgentTicketHistoryRepository
  ) {}

  public async execute({
    id,
    agent_id,
    ticket_id,
  }: IUpdateAgentTicketHistory & { id: string }): Promise<void> {
    const agentTicketHistory = await this.agentTicketHistoryRepository.findById(
      id
    );

    if (!agentTicketHistory) {
      throw new Error('AgentTicketHistory not found.');
    }

    await this.agentTicketHistoryRepository.update({
      id,
      agent_id,
      ticket_id,
    });
  }
}
