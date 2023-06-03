import AppError from '../../../../api/errors/AppError';
import { connection } from '../../../../api/database/connection';
import {
  ICreateCategoryDTO,
  IResponseCategoryDTO,
  IUpdateCategoryDTO,
} from '../../domain/dtos';
import { ICategoriesRepository } from '../../domain/repositories/ICategoriesRepository';

export class CategoriesRepository implements ICategoriesRepository {
  async findByName(name: string): Promise<IResponseCategoryDTO | null> {
    const { rows } = await connection.query(
      'SELECT * FROM categories WHERE name = $1',
      [name]
    );
    return rows[0] || null;
  }

  async findById(id: string): Promise<IResponseCategoryDTO | null> {
    const { rows } = await connection.query(
      'SELECT * FROM categories WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM categories WHERE id = $1', [id]);
  }

  async findAll(): Promise<IResponseCategoryDTO[]> {
    const { rows } = await connection.query('SELECT * FROM categories');
    return rows;
  }

  async create({ name }: ICreateCategoryDTO): Promise<IResponseCategoryDTO> {
    const { rows } = await connection.query(
      `INSERT INTO categories (
        name
      ) VALUES ($1) RETURNING *`,
      [name]
    );
    return rows[0];
  }

  async update({
    name,
    id,
  }: IUpdateCategoryDTO): Promise<IResponseCategoryDTO> {
    const fields = [];
    const values = [];

    let i = 1;

    if (name) {
      fields.push(`name = $${i}`);
      values.push(name);
      i++;
    }

    if (fields.length === 0) {
      throw new AppError(
        'At least one field must be provided to update an category.'
      );
    }

    values.push(id);

    const query = `
      UPDATE categories
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
      RETURNING *
    `;

    const { rows } = await connection.query(query, values);

    const categoryUpdated: IResponseCategoryDTO = rows[0];

    return categoryUpdated;
  }
}
