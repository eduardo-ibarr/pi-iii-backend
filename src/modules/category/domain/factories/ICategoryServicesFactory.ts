import {
  ICreateCategoryService,
  IListCategoriesService,
  IShowCategoryService,
  IDeleteCategoryService,
  IUpdateCategoryService,
} from '../services';

export interface ICategoryServicesFactory {
  createCategoryService(): ICreateCategoryService;
  listCategoriesService(): IListCategoriesService;
  showCategoryService(): IShowCategoryService;
  deleteCategoryService(): IDeleteCategoryService;
  updateCategoryService(): IUpdateCategoryService;
}
