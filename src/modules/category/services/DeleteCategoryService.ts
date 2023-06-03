import AppError from '../../../api/errors/AppError';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';
import { IDeleteCategoryService } from '../domain/services';

export class DeleteCategoryService implements IDeleteCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public async execute(id: string): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    await this.categoriesRepository.remove(category.id);
  }
}
