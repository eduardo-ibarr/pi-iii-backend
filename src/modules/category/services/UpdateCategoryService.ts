import AppError from '../../../api/errors/AppError';
import { IUpdateCategory } from '../domain/models';
import { CategoriesRepository } from '../infra/repositories/CategoriesRepository';

export class UpdateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  public async execute({
    id,
    name,
  }: IUpdateCategory & { id: string }): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new AppError('Category not found.', 404);
    }

    if (name) {
      const nameAlreadyExists = await this.categoriesRepository.findByName(
        name
      );

      if (nameAlreadyExists) {
        throw new AppError('There are another category with this name.', 409);
      }
    }

    await this.categoriesRepository.update({
      name,
      id,
    });
  }
}
