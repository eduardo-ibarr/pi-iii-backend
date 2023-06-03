import AppError from '../../../api/errors/AppError';
import { IResponseCategoryDTO } from '../domain/dtos';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';
import { IShowCategoryService } from '../domain/services';

export class ShowCategoryService implements IShowCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public async execute(id: string): Promise<IResponseCategoryDTO | null> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    return category;
  }
}
