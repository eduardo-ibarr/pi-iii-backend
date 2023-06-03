import { ICategoriesRepository } from '../domain/repositories/ICategoriesRepository';
import {
  ICreateCategoryService,
  IListCategoriesService,
  IShowCategoryService,
  IDeleteCategoryService,
  IUpdateCategoryService,
} from '../domain/services';
import { CategoriesRepository } from '../infra/repositories/CategoriesRepository';
import {
  CreateCategoryService,
  ListCategoriesService,
  ShowCategoryService,
  DeleteCategoryService,
  UpdateCategoryService,
} from '../services';
import { ICategoryServicesFactory } from '../domain/factories/ICategoryServicesFactory';

export class CategoryServicesFactory implements ICategoryServicesFactory {
  private categoriesRepository(): ICategoriesRepository {
    return new CategoriesRepository();
  }

  public createCategoryService(): ICreateCategoryService {
    const categoriesRepository = this.categoriesRepository();

    return new CreateCategoryService(categoriesRepository);
  }

  public listCategoriesService(): IListCategoriesService {
    const categoriesRepository = this.categoriesRepository();

    return new ListCategoriesService(categoriesRepository);
  }

  public showCategoryService(): IShowCategoryService {
    const categoriesRepository = this.categoriesRepository();

    return new ShowCategoryService(categoriesRepository);
  }

  public deleteCategoryService(): IDeleteCategoryService {
    const categoriesRepository = this.categoriesRepository();

    return new DeleteCategoryService(categoriesRepository);
  }

  public updateCategoryService(): IUpdateCategoryService {
    const categoriesRepository = this.categoriesRepository();

    return new UpdateCategoryService(categoriesRepository);
  }
}
