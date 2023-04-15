import { ICategory, ICreateCategory, IUpdateCategory } from '../models';

export interface ICategoriesRepository {
  findById(id: string): Promise<ICategory | null>;
  delete(id: string): Promise<void>;
  list(): Promise<ICategory[]>;
  create({ name }: ICreateCategory): Promise<ICategory>;
  update({ name }: IUpdateCategory): Promise<void>;
}
