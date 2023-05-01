import { Request, Response } from 'express';
import {
  ListMessagesService,
  ShowMessageService,
  CreateMessageService,
  UpdateMessageService,
  DeleteMessageService,
} from '../../../services';

import { MessagesRepository } from '../../repositories/MessagesRepository';
import { ConversationsRepository } from '../../../../../modules/conversation/infra/repositories/ConversationsRepository';
import { TicketsRepository } from '../../../../../modules/ticket/infra/repositories/TicketsRepository';

const messagesRepository = new MessagesRepository();
const ticketsRepository = new TicketsRepository();
const conversationsRepository = new ConversationsRepository();

export class MessagesController {
  async index(request: Request, response: Response): Promise<Response> {
    const messages = await new ListMessagesService(
      messagesRepository
    ).execute();

    return response.status(200).json(messages);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const agent = await new ShowMessageService(messagesRepository).execute(id);

    return response.status(200).json(agent);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { content, conversation_id, read_status, sender, ticket_id } =
      request.body;

    const agent = await new CreateMessageService(
      messagesRepository,
      ticketsRepository,
      conversationsRepository
    ).execute({
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

    await new DeleteMessageService(messagesRepository).execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { content, conversation_id, read_status, sender, ticket_id } =
      request.body;
    const { id } = request.params;

    const agent = await new UpdateMessageService(
      messagesRepository,
      ticketsRepository,
      conversationsRepository
    ).execute({
      id,
      content,
      conversation_id,
      read_status,
      sender,
      ticket_id,
    });

    return response.status(200).json(agent);
  }
}
