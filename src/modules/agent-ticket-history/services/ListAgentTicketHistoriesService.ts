import { IAgentTicketHistory } from '../domain/models';
import { AgentTicketHistoriesRepository } from '../infra/repositories/AgentTicketHistoriesRepository';

export class ListAgentTicketHistoriesService {
  constructor(
    private agentTicketHistoriesRepository: AgentTicketHistoriesRepository
  ) {}

  public async execute(): Promise<IAgentTicketHistory[]> {
    const agentTicketHistories =
      await this.agentTicketHistoriesRepository.findAll();
    return agentTicketHistories;
  }
}
