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
      throw new Error('Category not found.');
    }

    await this.categoriesRepository.update({
      name,
      id,
    });
  }
}
