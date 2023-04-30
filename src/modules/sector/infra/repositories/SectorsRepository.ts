import { connection } from '../../../../api/database/connection';
import { ISector, ICreateSector, IUpdateSector } from '../../domain/models';
import { ISectorsRepository } from '../../domain/repositories/ISectorsRepository';

export class SectorsRepository implements ISectorsRepository {
  async findById(id: string): Promise<ISector | null> {
    const { rows } = await connection.query(
      'SELECT * FROM sectors WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM sectors WHERE id = $1', [id]);
  }

  async findAll(): Promise<ISector[]> {
    const { rows } = await connection.query('SELECT * FROM sectors');
    return rows;
  }

  async create({ name }: ICreateSector): Promise<ISector> {
    const { rows } = await connection.query(
      `INSERT INTO sectors (
        name,
      ) VALUES ($1) RETURNING *`,
      [name]
    );
    return rows[0];
  }

  async update({ name, id }: IUpdateSector & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    if (name) {
      fields.push('name = $3');
      values.push(name);
    }

    if (fields.length === 0) {
      throw new Error(
        'At least one field must be provided to update an sector.'
      );
    }

    values.push(id);

    const query = `
      UPDATE sectors
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
    `;

    await connection.query(query, values);
  }
}
