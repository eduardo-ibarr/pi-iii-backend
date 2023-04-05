import { ICreateOrderRepository } from '../models/ICreateOrderRepository';
import { IOrder } from '../models/IOrder';
import { IUpdateOrderRepository } from '../models/IUpdateOrderRepository';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder | null>;
  delete(id: string): Promise<void>;
  list(): Promise<IOrder[]>;
  create({ customer, description }: ICreateOrderRepository): Promise<IOrder>;
  update({ customer, description }: IUpdateOrderRepository): Promise<void>;
}
