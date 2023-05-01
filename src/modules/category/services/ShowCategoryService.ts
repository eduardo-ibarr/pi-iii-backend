import { CategoriesRepository } from '../infra/repositories/CategoriesRepository';

export class ShowCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  public async execute(id: string) {
    const category = await this.categoriesRepository.findById(id);
    return category;
  }
}
