import { Request, Response } from 'express';
import { SectorsRepository } from '../../repositories/SectorsRepository';
import {
  ListSectorsService,
  ShowSectorService,
  CreateSectorService,
  DeleteSectorService,
  UpdateSectorService,
} from '../../../services';

const sectorsRepository = new SectorsRepository();

export class SectorsController {
  async index(request: Request, response: Response): Promise<Response> {
    const sectors = await new ListSectorsService(sectorsRepository).execute();

    return response.status(200).json(sectors);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const sector = await new ShowSectorService(sectorsRepository).execute(id);

    return response.status(200).json(sector);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const sector = await new CreateSectorService(sectorsRepository).execute({
      name,
    });

    return response.status(201).json(sector);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await new DeleteSectorService(sectorsRepository).execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const sector = await new UpdateSectorService(sectorsRepository).execute({
      id,
      name,
    });

    return response.status(200).json(sector);
  }
}
