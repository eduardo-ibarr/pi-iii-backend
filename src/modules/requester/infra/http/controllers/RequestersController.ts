import { Request, Response } from 'express';
import { RequestersRepository } from '../../repositories/RequestersRepository';
import {
  ListRequestersService,
  ShowRequesterService,
  CreateRequesterService,
  UpdateRequesterService,
  DeleteRequesterService,
} from '../../../services';

const requestersRepository = new RequestersRepository();

export class RequestersController {
  async index(request: Request, response: Response): Promise<Response> {
    const requesters = await new ListRequestersService(
      requestersRepository
    ).execute();

    return response.status(200).json(requesters);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const requester = await new ShowRequesterService(
      requestersRepository
    ).execute(id);

    return response.status(200).json(requester);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;

    const requester = await new CreateRequesterService(
      requestersRepository
    ).execute({ email, name, password });

    return response.status(201).json(requester);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await new DeleteRequesterService(requestersRepository).execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { email, name, password } = request.body;
    const { id } = request.params;

    const requester = await new UpdateRequesterService(
      requestersRepository
    ).execute({
      id,
      email,
      name,
      password,
    });

    return response.status(200).json(requester);
  }
}
