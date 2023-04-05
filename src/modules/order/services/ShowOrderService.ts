import { OrdersRepository } from '../infra/repositories/OrdersRepository';

export class ShowOrderService {
  constructor(private ordersRepository: OrdersRepository) {}

  public async execute(id: string) {
    const order = await this.ordersRepository.findById(id);

    if (!order) {
      throw new Error('Order not found.');
    }

    return order;
  }
}
