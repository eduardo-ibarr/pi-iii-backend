import { CategoriesRepository } from '../infra/repositories/CategoriesRepository';

export class DeleteCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  public async execute(id: string): Promise<void> {
    const category = await this.categoriesRepository.findById(id);

    if (!category) {
      throw new Error('Category not found.');
    }

    await this.categoriesRepository.remove(category.id);
  }
}
