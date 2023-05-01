import { Request, Response } from 'express';
import {
  ListAgentTicketHistoriesService,
  ShowAgentTicketHistoryService,
  CreateAgentTicketHistoryService,
  DeleteAgentTicketHistoryService,
  UpdateAgentTicketHistoryService,
} from '../../../services';

import { AgentTicketHistoriesRepository } from '../../repositories/AgentTicketHistoriesRepository';
import { TicketsRepository } from '../../../../../modules/ticket/infra/repositories/TicketsRepository';
import { AgentsRepository } from '../../../../../modules/agent/infra/repositories/AgentsRepository';

const agentTicketHistoryRepository = new AgentTicketHistoriesRepository();
const ticketsRepository = new TicketsRepository();
const agentsRepository = new AgentsRepository();

export class AgentTicketHistoriesController {
  async index(request: Request, response: Response): Promise<Response> {
    const agentTicketHistories = await new ListAgentTicketHistoriesService(
      agentTicketHistoryRepository
    ).execute();

    return response.status(200).json(agentTicketHistories);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const agentTicketHistory = await new ShowAgentTicketHistoryService(
      agentTicketHistoryRepository
    ).execute(id);

    return response.status(200).json(agentTicketHistory);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { agent_id, ticket_id } = request.body;

    const agentTicketHistory = await new CreateAgentTicketHistoryService(
      agentTicketHistoryRepository,
      ticketsRepository,
      agentsRepository
    ).execute({
      agent_id,
      ticket_id,
    });

    return response.status(201).json(agentTicketHistory);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await new DeleteAgentTicketHistoryService(
      agentTicketHistoryRepository
    ).execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { agent_id, ticket_id } = request.body;
    const { id } = request.params;

    const agentTicketHistory = await new UpdateAgentTicketHistoryService(
      agentTicketHistoryRepository,
      ticketsRepository,
      agentsRepository
    ).execute({
      id,
      agent_id,
      ticket_id,
    });

    return response.status(200).json(agentTicketHistory);
  }
}
