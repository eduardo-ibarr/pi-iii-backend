import AppError from '../../../api/errors/AppError';
import { IResponseCategoryDTO, IUpdateCategoryDTO } from '../domain/dtos';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';
import { IUpdateCategoryService } from '../domain/services';

export class UpdateCategoryService implements IUpdateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public async execute({
    id,
    name,
  }: IUpdateCategoryDTO): Promise<IResponseCategoryDTO> {
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

    const categoryUpdated = await this.categoriesRepository.update({
      name,
      id,
    });

    return categoryUpdated;
  }
}
