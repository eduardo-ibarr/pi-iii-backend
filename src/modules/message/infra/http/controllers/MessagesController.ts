import { Request, Response } from 'express';

import { IMessageServicesFactory } from 'src/modules/message/domain/factories/IMessageServicesFactory';
import { IMessagesController } from 'src/modules/message/domain/controllers/IMessagesController';

export class MessagesController implements IMessagesController {
  constructor(private messageServicesFactory: IMessageServicesFactory) {
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const service = this.messageServicesFactory.listMessagesService();
    const messages = await service.execute();

    return response.status(200).json(messages);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.messageServicesFactory.showMessageService();
    const agent = await service.execute(id);

    return response.status(200).json(agent);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { content, conversation_id, read_status, sender, ticket_id } =
      request.body;
    const service = this.messageServicesFactory.createMessageService();
    const agent = await service.execute({
      content,
      conversation_id,
      read_status,
      sender,
      ticket_id,
    });

    return response.status(201).json(agent);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.messageServicesFactory.deleteMessageService();
    await service.execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { content, conversation_id, read_status, sender, ticket_id } =
      request.body;
    const { id } = request.params;
    const service = this.messageServicesFactory.updateMessageService();
    const agent = await service.execute({
      id: id,
      content,
      conversation_id,
      read_status,
      sender,
      ticket_id,
    });

    return response.status(200).json(agent);
  }
}
