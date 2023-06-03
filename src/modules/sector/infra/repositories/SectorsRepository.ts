import AppError from '../../../../api/errors/AppError';
import { connection } from '../../../../api/database/connection';
import {
  IResponseSectorDTO,
  ICreateSectorDTO,
  IUpdateSectorDTO,
} from '../../domain/dtos';
import { ISectorsRepository } from '../../domain/repositories/ISectorsRepository';

export class SectorsRepository implements ISectorsRepository {
  async findById(id: string): Promise<IResponseSectorDTO | null> {
    const { rows } = await connection.query(
      'SELECT * FROM sectors WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async findByName(name: string): Promise<IResponseSectorDTO | null> {
    const { rows } = await connection.query(
      'SELECT * FROM sectors WHERE name = $1',
      [name]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM sectors WHERE id = $1', [id]);
  }

  async findAll(): Promise<IResponseSectorDTO[]> {
    const { rows } = await connection.query('SELECT * FROM sectors');
    return rows;
  }

  async create({ name }: ICreateSectorDTO): Promise<IResponseSectorDTO> {
    const { rows } = await connection.query(
      `INSERT INTO sectors (
        name
      ) VALUES ($1) RETURNING *`,
      [name]
    );
    return rows[0];
  }

  async update({ name, id }: IUpdateSectorDTO): Promise<IResponseSectorDTO> {
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
        'At least one field must be provided to update an sector.'
      );
    }

    values.push(id);

    const query = `
      UPDATE sectors
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
      RETURNING *
    `;

    const { rows } = await connection.query(query, values);

    const sectorUpdated: IResponseSectorDTO = rows[0];

    return sectorUpdated;
  }
}
