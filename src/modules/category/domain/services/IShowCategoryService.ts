import { IResponseCategoryDTO } from '../dtos';

export interface IShowCategoryService {
  execute(id: string): Promise<IResponseCategoryDTO | null>;
}
