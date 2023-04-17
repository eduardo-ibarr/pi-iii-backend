import { ICall, ICreateCall, IUpdateCall } from '../models';

export interface ICallsRepository {
  findById(id: string): Promise<ICall | null>;
  remove(id: string): Promise<void>;
  findAll(): Promise<ICall[]>;
  create({
    description,
    id_category,
    id_requester,
    id_sector,
    status,
    subject,
  }: ICreateCall): Promise<ICall>;
  update({
    description,
    id_category,
    id_requester,
    id_sector,
    status,
    subject,
  }: IUpdateCall): Promise<void>;
}
