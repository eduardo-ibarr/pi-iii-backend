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

  async create({
    active,
    id_sector,
    name,
  }: ICreateRequester): Promise<IRequester> {
    const { rows } = await connection.query(
      `INSERT INTO requesters (
        active,
        id_sector,
        name,
      ) VALUES ($1, $2, $3) RETURNING *`,
      [active, id_sector, name]
    );
    return rows[0];
  }

  async update({
    active,
    id_sector,
    name,
    id,
  }: IUpdateRequester & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    if (active) {
      fields.push('active = $1');
      values.push(active);
    }

    if (id_sector) {
      fields.push('id_sector = $2');
      values.push(id_sector);
    }

    if (name) {
      fields.push('name = $3');
      values.push(name);
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
