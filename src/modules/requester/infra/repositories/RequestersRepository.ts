import { connection } from 'api/database/connection';
import {
  IRequester,
  ICreateRequester,
  IUpdateRequester,
} from '../../domain/models';
import { IRequestersRepository } from '../../domain/repositories/IRequestersRepository';

export class RequestersRepository implements IRequestersRepository {
  async findById(id: string): Promise<IRequester | null> {
    const { rows } = await connection.query(
      'SELECT * FROM requesters WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM requesters WHERE id = $1', [id]);
  }

  async findAll(): Promise<IRequester[]> {
    const { rows } = await connection.query('SELECT * FROM requesters');
    return rows;
  }

  async create({ name, email }: ICreateRequester): Promise<IRequester> {
    const { rows } = await connection.query(
      `INSERT INTO requesters (
        name,
        email
      ) VALUES ($1, $2) RETURNING *`,
      [name, email]
    );
    return rows[0];
  }

  async update({
    name,
    email,
    id,
  }: IUpdateRequester & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    if (name) {
      fields.push('name = $1');
      values.push(name);
    }

    if (email) {
      fields.push('email = $2');
      values.push(email);
    }

    if (fields.length === 0) {
      throw new Error(
        'At least one field must be provided to update an requester.'
      );
    }

    values.push(id);

    const query = `
      UPDATE requesters
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
    `;

    await connection.query(query, values);
  }
}
