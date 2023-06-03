import { Request, Response } from 'express';
import { IConversationServicesFactory } from '../../../domain/factories/IConversationServicesFactory';

export class ConversationsController {
  constructor(
    private conversationServicesFactory: IConversationServicesFactory
  ) {
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const service = this.conversationServicesFactory.listConversationsService();
    const conversations = await service.execute();

    return response.json(conversations);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.conversationServicesFactory.showConversationService();
    const conversation = await service.execute(id);

    return response.json(conversation);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { ticket_id } = request.body;
    const service =
      this.conversationServicesFactory.createConversationService();
    const conversation = await service.execute({
      ticket_id,
    });

    return response.status(201).json(conversation);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service =
      this.conversationServicesFactory.deleteConversationService();
    await service.execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { ticket_id } = request.body;
    const { id } = request.params;
    const service =
      this.conversationServicesFactory.updateConversationService();
    const conversation = await service.execute({
      id,
      ticket_id,
    });

    return response.json(conversation);
  }
}
