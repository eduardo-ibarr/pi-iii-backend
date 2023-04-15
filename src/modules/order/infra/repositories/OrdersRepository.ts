import { connection } from 'api/database/connection';
import {
  IOrder,
  ICreateOrderRepository,
  IUpdateOrderRepository,
} from '../../domain/models';
import { IOrdersRepository } from '../../domain/repositories/IOrdersRepository';

export class OrdersRepository implements IOrdersRepository {
  async findById(id: string): Promise<IOrder | null> {
    const { rows } = await connection.query(
      'SELECT * FROM orders WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async delete(id: string): Promise<void> {
    await connection.query('DELETE FROM orders WHERE id = $1', [id]);
  }

  async list(): Promise<IOrder[]> {
    const { rows } = await connection.query('SELECT * FROM orders');
    return rows;
  }

  async create({
    customer,
    description,
  }: ICreateOrderRepository): Promise<IOrder> {
    const { rows } = await connection.query(
      'INSERT INTO orders (customer, description) VALUES ($1, $2) RETURNING *',
      [customer, description]
    );
    return rows[0];
  }

  async update({
    id,
    customer,
    description,
  }: IUpdateOrderRepository & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    if (customer) {
      fields.push('customer = $1');
      values.push(customer);
    }

    if (description) {
      fields.push('description = $2');
      values.push(description);
    }

    if (fields.length === 0) {
      throw new Error(
        'At least one field must be provided to update an order.'
      );
    }

    values.push(id);

    const query = `
      UPDATE orders
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
    `;

    await connection.query(query, values);
  }
}
