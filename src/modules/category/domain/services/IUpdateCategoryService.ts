import { IResponseCategoryDTO, IUpdateCategoryDTO } from '../dtos';

export interface IUpdateCategoryService {
  execute(data: IUpdateCategoryDTO): Promise<IResponseCategoryDTO>;
}
