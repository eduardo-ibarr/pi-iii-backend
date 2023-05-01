import AppError from '../../../api/errors/AppError';
import { CategoriesRepository } from '../infra/repositories/CategoriesRepository';

export class ShowCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  public async execute(id: string) {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    return category;
  }
}
