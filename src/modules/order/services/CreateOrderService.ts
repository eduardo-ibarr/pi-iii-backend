import { ICreateOrderRepository } from '../domain/models';
import { OrdersRepository } from '../infra/repositories/OrdersRepository';

export class CreateOrderService {
  constructor(private ordersRepository: OrdersRepository) {}

  public async execute({ customer, description }: ICreateOrderRepository) {
    const order = await this.ordersRepository.create({
      customer,
      description,
    });

    return order;
  }
}
