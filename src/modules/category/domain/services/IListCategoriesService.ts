import { IResponseCategoryDTO } from '../dtos';

export interface IListCategoriesService {
  execute(): Promise<IResponseCategoryDTO[]>;
}
