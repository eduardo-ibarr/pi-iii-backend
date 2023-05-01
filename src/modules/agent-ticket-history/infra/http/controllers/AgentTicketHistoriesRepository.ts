import { Request, Response } from 'express';
import { AgentTicketHistoriesRepository } from '../../repositories/AgentTicketHistoriesRepository';
import {
  ListAgentTicketHistoriesService,
  ShowAgentTicketHistoryService,
  CreateAgentTicketHistoryService,
  DeleteAgentTicketHistoryService,
  UpdateAgentTicketHistoryService,
} from '../../../services';

const agentTicketHistoryRepository = new AgentTicketHistoriesRepository();

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
      agentTicketHistoryRepository
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
      agentTicketHistoryRepository
    ).execute({
      id,
      agent_id,
      ticket_id,
    });

    return response.status(200).json(agentTicketHistory);
  }
}
