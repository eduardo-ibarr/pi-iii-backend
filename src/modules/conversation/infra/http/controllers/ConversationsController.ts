import { Request, Response } from 'express';
import { ConversationsRepository } from '../../repositories/ConversationsRepository';
import {
  ListConversationsService,
  ShowConversationService,
  CreateConversationService,
  UpdateConversationService,
  DeleteConversationService,
} from 'src/modules/conversation/services';

const conversationsRepository = new ConversationsRepository();

export class ConversationsController {
  async index(request: Request, response: Response): Promise<Response> {
    const conversations = await new ListConversationsService(
      conversationsRepository
    ).execute();

    return response.json(conversations);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const conversation = await new ShowConversationService(
      conversationsRepository
    ).execute(id);

    return response.json(conversation);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { agent_id, ticket_id } = request.body;

    const conversation = await new CreateConversationService(
      conversationsRepository
    ).execute({
      agent_id,
      ticket_id,
    });

    return response.status(201).json(conversation);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await new DeleteConversationService(conversationsRepository).execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { agent_id, ticket_id } = request.body;
    const { id } = request.params;

    const conversation = await new UpdateConversationService(
      conversationsRepository
    ).execute({
      id,
      agent_id,
      ticket_id,
    });

    return response.json(conversation);
  }
}