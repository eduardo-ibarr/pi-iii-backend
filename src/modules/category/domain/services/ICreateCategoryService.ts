import { IResponseCategoryDTO, ICreateCategoryDTO } from '../dtos';

export interface ICreateCategoryService {
  execute(data: ICreateCategoryDTO): Promise<IResponseCategoryDTO>;
}
