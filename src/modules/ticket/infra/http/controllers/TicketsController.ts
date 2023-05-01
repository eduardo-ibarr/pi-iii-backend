import { Request, Response } from 'express';
import {
  ListTicketsService,
  ShowTicketService,
  CreateTicketService,
  DeleteTicketService,
  UpdateTicketService,
} from '../../../services';

import { TicketsRepository } from '../../repositories/TicketsRepository';
import { RequestersRepository } from '../../../../../modules/requester/infra/repositories/RequestersRepository';
import { CategoriesRepository } from '../../../../../modules/category/infra/repositories/CategoriesRepository';
import { AgentsRepository } from '../../../../../modules/agent/infra/repositories/AgentsRepository';
import { SectorsRepository } from '../../../../../modules/sector/infra/repositories/SectorsRepository';

const ticketsRepository = new TicketsRepository();
const requestersRepository = new RequestersRepository();
const categoriesRepository = new CategoriesRepository();
const agentsRepository = new AgentsRepository();
const sectorsRepository = new SectorsRepository();

export class TicketsController {
  async index(request: Request, response: Response): Promise<Response> {
    const tickets = await new ListTicketsService(ticketsRepository).execute();

    return response.status(200).json(tickets);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const ticket = await new ShowTicketService(ticketsRepository).execute(id);

    return response.status(200).json(ticket);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const {
      agent_id,
      category_id,
      content,
      requester_id,
      sector_id,
      status,
      subject,
      read_status,
    } = request.body;

    const ticket = await new CreateTicketService(
      ticketsRepository,
      requestersRepository,
      categoriesRepository,
      agentsRepository,
      sectorsRepository
    ).execute({
      agent_id,
      category_id,
      content,
      requester_id,
      sector_id,
      status,
      subject,
      read_status,
    });

    return response.status(201).json(ticket);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await new DeleteTicketService(ticketsRepository).execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const {
      agent_id,
      category_id,
      content,
      requester_id,
      sector_id,
      status,
      subject,
      read_status,
    } = request.body;
    const { id } = request.params;

    const ticket = await new UpdateTicketService(
      ticketsRepository,
      requestersRepository,
      categoriesRepository,
      agentsRepository,
      sectorsRepository
    ).execute({
      id,
      agent_id,
      category_id,
      content,
      requester_id,
      sector_id,
      status,
      subject,
      read_status,
    });

    return response.status(200).json(ticket);
  }
}
