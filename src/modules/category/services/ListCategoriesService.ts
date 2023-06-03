import { IResponseCategoryDTO } from '../domain/dtos';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';
import { IListCategoriesService } from '../domain/services';

export class ListCategoriesService implements IListCategoriesService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public async execute(): Promise<IResponseCategoryDTO[]> {
    const categories = await this.categoriesRepository.findAll();
    return categories;
  }
}
