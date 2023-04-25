import { CategoriesRepository } from '../infra/repositories/CategoriesRepository';

export class ListCategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  public async execute() {
    const categories = await this.categoriesRepository.findAll();
    return categories;
  }
}
