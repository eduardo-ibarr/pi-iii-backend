import { Request, Response } from 'express';

import { ISectorServicesFactory } from '../../../domain/factories/ISectorServicesFactory';

export class SectorsController {
  constructor(private sectorServicesFactory: ISectorServicesFactory) {
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const service = this.sectorServicesFactory.listSectorsService();
    const sectors = await service.execute();

    return response.status(200).json(sectors);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.sectorServicesFactory.showSectorService();
    const sector = await service.execute(id);

    return response.status(200).json(sector);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const service = this.sectorServicesFactory.createSectorService();
    const sector = await service.execute({
      name,
    });

    return response.status(201).json(sector);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.sectorServicesFactory.deleteSectorService();
    await service.execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;
    const service = this.sectorServicesFactory.updateSectorService();
    const sector = await service.execute({
      id,
      name,
    });

    return response.status(200).json(sector);
  }
}
