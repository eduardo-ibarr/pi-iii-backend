import { IRequester, ICreateRequester, IUpdateRequester } from '../models';

export interface IRequestersRepository {
  findById(id: string): Promise<IRequester | null>;
  delete(id: string): Promise<void>;
  list(): Promise<IRequester[]>;
  create({ name, id_sector, active }: ICreateRequester): Promise<IRequester>;
  update({ name, id_sector, active }: IUpdateRequester): Promise<void>;
}
