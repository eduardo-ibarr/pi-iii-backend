import AppError from '../../../api/errors/AppError';
import { ICreateCategoryDTO, IResponseCategoryDTO } from '../domain/dtos';
import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';
import { ICreateCategoryService } from '../domain/services';

export class CreateCategoryService implements ICreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  public async execute({
    name,
  }: ICreateCategoryDTO): Promise<IResponseCategoryDTO> {
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
