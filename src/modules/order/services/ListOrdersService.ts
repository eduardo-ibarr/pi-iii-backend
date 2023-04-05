import { OrdersRepository } from '../infra/repositories/OrdersRepository';

export class ListOrdersService {
  constructor(private ordersRepository: OrdersRepository) {}

  public async execute() {
    const orders = await this.ordersRepository.list();
    return orders;
  }
}
