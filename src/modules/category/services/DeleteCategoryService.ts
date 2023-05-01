import AppError from '../../../api/errors/AppError';
import { CategoriesRepository } from '../infra/repositories/CategoriesRepository';

export class DeleteCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  public async execute(id: string): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    await this.categoriesRepository.remove(category.id);
  }
}
