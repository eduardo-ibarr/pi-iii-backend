import { ICategory, ICreateCategory, IUpdateCategory } from '../models';

export interface ICategoriesRepository {
  findById(id: string): Promise<ICategory | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<ICategory[]>;
  create({ name }: ICreateCategory): Promise<ICategory>;
  update({ name }: IUpdateCategory): Promise<void>;
}
