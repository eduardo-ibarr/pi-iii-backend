import {
  ICategory,
  ICreateCategoryRepository,
  IUpdateCategoryRepository,
} from '../models';

export interface ICategorysRepository {
  findById(id: string): Promise<ICategory | null>;
  delete(id: string): Promise<void>;
  list(): Promise<ICategory[]>;
  create({ name }: ICreateCategoryRepository): Promise<ICategory>;
  update({ name }: IUpdateCategoryRepository): Promise<void>;
}
