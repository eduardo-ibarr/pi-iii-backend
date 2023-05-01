import { Request, Response } from 'express';
import { CategoriesRepository } from '../../repositories/CategoriesRepository';
import {
  ListCategoriesService,
  ShowCategoryService,
  CreateCategoryService,
  DeleteCategoryService,
  UpdateCategoryService,
} from '../../../services';

const categoriesRepository = new CategoriesRepository();

export class CategoriesController {
  async index(request: Request, response: Response): Promise<Response> {
    const categories = await new ListCategoriesService(
      categoriesRepository
    ).execute();

    return response.status(200).json(categories);
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const category = await new ShowCategoryService(
      categoriesRepository
    ).execute(id);

    return response.status(200).json(category);
  }

  async store(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;

    const agent = await new CreateCategoryService(categoriesRepository).execute(
      {
        name,
      }
    );

    return response.status(201).json(agent);
  }

  async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    await new DeleteCategoryService(categoriesRepository).execute(id);

    return response.sendStatus(200);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const agent = await new UpdateCategoryService(categoriesRepository).execute(
      {
        id,
        name,
      }
    );

    return response.status(200).json(agent);
  }
}
