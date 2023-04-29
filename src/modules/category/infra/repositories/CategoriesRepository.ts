import { connection } from '@api/database/connection';
import {
  ICategory,
  ICreateCategory,
  IUpdateCategory,
} from '../../domain/models';
import { ICategoriesRepository } from '../../domain/repositories/ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  async findById(id: string): Promise<ICategory | null> {
    const { rows } = await connection.query(
      'SELECT * FROM categories WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM categories WHERE id = $1', [id]);
  }

  async findAll(): Promise<ICategory[]> {
    const { rows } = await connection.query('SELECT * FROM categories');
    return rows;
  }

  async create({ name }: ICreateCategory): Promise<ICategory> {
    const { rows } = await connection.query(
      `INSERT INTO categories (
        name,
      ) VALUES ($1) RETURNING *`,
      [name]
    );
    return rows[0];
  }

  async update({ name, id }: IUpdateCategory & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    if (name) {
      fields.push('name = $1');
      values.push(name);
    }

    if (fields.length === 0) {
      throw new Error(
        'At least one field must be provided to update an Category.'
      );
    }

    values.push(id);

    const query = `
      UPDATE categories
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
    `;

    await connection.query(query, values);
  }
}
