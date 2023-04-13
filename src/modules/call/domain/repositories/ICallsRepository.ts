import { ICall, ICreateCallRepository, IUpdateCallRepository } from '../models';

export interface ICallsRepository {
  findById(id: string): Promise<ICall | null>;
  delete(id: string): Promise<void>;
  list(): Promise<ICall[]>;
  create({
    description,
    id_category,
    id_requester,
    id_sector,
    status,
    subject,
  }: ICreateCallRepository): Promise<ICall>;
  update({
    description,
    id_category,
    id_requester,
    id_sector,
    status,
    subject,
  }: IUpdateCallRepository): Promise<void>;
}
