import { IRequester, ICreateRequester, IUpdateRequester } from '../models';

export interface IRequestersRepository {
  findById(id: string): Promise<IRequester | null>;
  findByEmail(email: string): Promise<IRequester | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<IRequester[]>;
  create(data: ICreateRequester): Promise<IRequester>;
  update(data: IUpdateRequester): Promise<void>;
}
