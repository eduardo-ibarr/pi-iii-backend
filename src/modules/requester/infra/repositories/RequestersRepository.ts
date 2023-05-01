import { connection } from '../../../../api/database/connection';
import {
  IRequester,
  ICreateRequester,
  IUpdateRequester,
} from '../../domain/models';
import { IRequestersRepository } from '../../domain/repositories/IRequestersRepository';

export class RequestersRepository implements IRequestersRepository {
  async findByEmail(email: string): Promise<IRequester | null> {
    const { rows } = await connection.query(
      'SELECT * FROM requesters WHERE email = $1',
      [email]
    );
    return rows[0] || null;
  }

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
    name,
    email,
    password,
  }: ICreateRequester): Promise<IRequester> {
    const { rows } = await connection.query(
      `INSERT INTO requesters (
        name,
        email,
        password
      ) VALUES ($1, $2, $3) RETURNING *`,
      [name, email, password]
    );
    return rows[0];
  }

  async update({
    name,
    email,
    password,
    id,
  }: IUpdateRequester & { id: string }): Promise<void> {
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
