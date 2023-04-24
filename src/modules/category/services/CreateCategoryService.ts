import { ICreateCategory } from '../domain/models';
import { CategoriesRepository } from '../infra/repositories/CategoriesRepository';

export class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  public async execute({ name }: ICreateCategory) {
    const category = await this.categoriesRepository.create({
      name,
    });

    return category;
  }
}
