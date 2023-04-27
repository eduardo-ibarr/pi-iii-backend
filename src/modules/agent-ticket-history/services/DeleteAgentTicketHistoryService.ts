import { AgentTicketHistoryRepository } from '../infra/repositories/AgentTicketHistoryRepository';

export class DeleteAgentTicketHistoryervice {
  constructor(
    private agentTicketHistoryRepository: AgentTicketHistoryRepository
  ) {}

  public async execute(id: string): Promise<void> {
    const agentTicketHistory = await this.agentTicketHistoryRepository.findById(
      id
    );

    if (!agentTicketHistory) {
      throw new Error('AgentTicketHistory not found.');
    }

    await this.agentTicketHistoryRepository.remove(agentTicketHistory.id);
  }
}
