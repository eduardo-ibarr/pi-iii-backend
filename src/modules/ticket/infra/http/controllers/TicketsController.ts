import { Request, Response } from 'express';

import { ITicketServicesFactory } from '../../../domain/factories/ITicketServicesFactory';

export class TicketsController {
  constructor(private ticketServicesFactory: ITicketServicesFactory) {
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const service = this.ticketServicesFactory.listTicketsService();
    const tickets = await service.execute();

    return response.status(200).json(tickets);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.ticketServicesFactory.showTicketService();
    const ticket = await service.execute(id);

    return response.status(200).json(ticket);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { category_id, content, requester_id, sector_id, status, subject } =
      request.body;
    const service = this.ticketServicesFactory.createTicketService();
    const ticket = await service.execute({
      category_id,
      content,
      requester_id,
      sector_id,
      status,
      subject,
    });

    return response.status(201).json(ticket);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.ticketServicesFactory.deleteTicketService();
    await service.execute(id);

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
    const service = this.ticketServicesFactory.updateTicketService();
    const ticket = await service.execute({
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
