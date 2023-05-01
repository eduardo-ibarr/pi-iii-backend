import AppError from 'src/api/errors/AppError';
import { ICreateCategory } from '../domain/models';
import { CategoriesRepository } from '../infra/repositories/CategoriesRepository';

export class CreateCategoryService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  public async execute({ name }: ICreateCategory) {
    const nameAlreadyExists = await this.categoriesRepository.findByName(name);

    if (nameAlreadyExists) {
      throw new AppError('There are another category with this name.', 409);
    }

    const category = await this.categoriesRepository.create({
      name,
    });

    return category;
  }
}
