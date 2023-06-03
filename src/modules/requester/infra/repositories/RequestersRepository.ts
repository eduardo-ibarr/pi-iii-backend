import AppError from '../../../../api/errors/AppError';
import { connection } from '../../../../api/database/connection';
import {
  IResponseRequesterDTO,
  ICreateRequesterDTO,
  IUpdateRequesterDTO,
  IRequesterAuthDTO,
} from '../../domain/dtos';
import { IRequestersRepository } from '../../domain/repositories/IRequestersRepository';

export class RequestersRepository implements IRequestersRepository {
  async findByEmailReturningAuthData(
    email: string
  ): Promise<IRequesterAuthDTO | null> {
    const { rows } = await connection.query(
      'SELECT id, email, password FROM requesters WHERE email = $1',
      [email]
    );
    return rows[0] || null;
  }

  async findByEmail(email: string): Promise<IResponseRequesterDTO | null> {
    const { rows } = await connection.query(
      'SELECT id, name, email, created_at, updated_at FROM requesters WHERE email = $1',
      [email]
    );
    return rows[0] || null;
  }

  async findById(id: string): Promise<IResponseRequesterDTO | null> {
    const { rows } = await connection.query(
      'SELECT id, name, email, created_at, updated_at FROM requesters WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM requesters WHERE id = $1', [id]);
  }

  async findAll(): Promise<IResponseRequesterDTO[]> {
    const { rows } = await connection.query(
      'SELECT id, name, email, created_at, updated_at FROM requesters'
    );
    return rows;
  }

  async create({
    name,
    email,
    password,
  }: ICreateRequesterDTO): Promise<IResponseRequesterDTO> {
    const { rows } = await connection.query(
      `INSERT INTO requesters (
        name,
        email,
        password
      ) VALUES ($1, $2, $3) RETURNING id, name, email, created_at, updated_at`,
      [name, email, password]
    );
    return rows[0];
  }

  async update({
    name,
    email,
    password,
    id,
  }: IUpdateRequesterDTO): Promise<IResponseRequesterDTO> {
    const fields = [];
    const values = [];

    let i = 1;

    if (name) {
      fields.push(`name = $${i}`);
      values.push(name);
      i++;
    }

    if (email) {
      fields.push(`email = $${i}`);
      values.push(email);
      i++;
    }

    if (password) {
      fields.push(`password = $${i}`);
      values.push(password);
      i++;
    }

    if (fields.length === 0) {
      throw new AppError(
        'At least one field must be provided to update an requester.'
      );
    }

    values.push(id);

    const query = `
      UPDATE requesters
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
      RETURNING *
    `;

    const { rows } = await connection.query(query, values);

    const requesterUpdated: IResponseRequesterDTO = rows[0];

    return requesterUpdated;
  }
}
