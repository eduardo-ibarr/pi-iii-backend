import { Request, Response } from 'express';
import { MessagesRepository } from '../../repositories/MessagesRepository';
import {
  ListMessagesService,
  ShowMessageService,
  CreateMessageService,
  UpdateMessageService,
  DeleteMessageService,
} from '../../../services';

const messagesRepository = new MessagesRepository();

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

    const agent = await new CreateMessageService(messagesRepository).execute({
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

    const agent = await new UpdateMessageService(messagesRepository).execute({
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
