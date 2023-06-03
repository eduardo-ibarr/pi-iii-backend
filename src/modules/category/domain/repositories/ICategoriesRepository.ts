import {
  ICreateCategoryDTO,
  IResponseCategoryDTO,
  IUpdateCategoryDTO,
} from '../dtos';

export interface ICategoriesRepository {
  findById(id: string): Promise<IResponseCategoryDTO | null>;
  findByName(name: string): Promise<IResponseCategoryDTO | null>;
  remove(id: string): Promise<any>;
  findAll(): Promise<IResponseCategoryDTO[]>;
  create(data: ICreateCategoryDTO): Promise<IResponseCategoryDTO>;
  update(data: IUpdateCategoryDTO): Promise<IResponseCategoryDTO>;
}
