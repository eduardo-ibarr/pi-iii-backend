import { Request, Response } from 'express';
import { ICategoriesController } from '../../../domain/controllers/ICategoriesController';
import { ICategoryServicesFactory } from '../../../domain/factories/ICategoryServicesFactory';

export class CategoriesController implements ICategoriesController {
  constructor(private categoryServicesFactory: ICategoryServicesFactory) {
    this.index = this.index.bind(this);
    this.show = this.show.bind(this);
    this.store = this.store.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
  }

  async index(request: Request, response: Response): Promise<Response> {
    const service = this.categoryServicesFactory.listCategoriesService();
    const categories = await service.execute();

    return response.status(200).json(categories);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.categoryServicesFactory.showCategoryService();
    const category = await service.execute(id);

    return response.status(200).json(category);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const service = this.categoryServicesFactory.createCategoryService();
    const category = await service.execute({ name });

    return response.status(201).json(category);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const service = this.categoryServicesFactory.deleteCategoryService();

    await service.execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;
    const service = this.categoryServicesFactory.updateCategoryService();
    const category = await service.execute({
      id,
      name,
    });

    return response.status(200).json(category);
  }
}
