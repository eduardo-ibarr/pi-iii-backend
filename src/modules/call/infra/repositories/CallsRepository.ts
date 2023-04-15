import { connection } from 'api/database/connection';
import { ICall, ICreateCall, IUpdateCall } from '../../domain/models';
import { ICallsRepository } from '../../domain/repositories/ICallsRepository';

export class CallsRepository implements ICallsRepository {
  async findById(id: string): Promise<ICall | null> {
    const { rows } = await connection.query(
      'SELECT * FROM calls WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async delete(id: string): Promise<void> {
    await connection.query('DELETE FROM calls WHERE id = $1', [id]);
  }

  async list(): Promise<ICall[]> {
    const { rows } = await connection.query('SELECT * FROM calls');
    return rows;
  }

  async create({
    id_category,
    id_requester,
    id_sector,
    status,
    subject,
    description,
  }: ICreateCall): Promise<ICall> {
    const { rows } = await connection.query(
      `INSERT INTO calls (
        id_category,
        id_requester,
        id_sector,
        status,
        subject,
        description
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [id_category, id_requester, id_sector, status, subject, description]
    );
    return rows[0];
  }

  async update({
    id,
    id_requester,
    id_sector,
    id_category,
    subject,
    status,
    description,
  }: IUpdateCall & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    if (id_requester) {
      fields.push('id_requester = $1');
      values.push(id_requester);
    }

    if (description) {
      fields.push('description = $2');
      values.push(description);
    }
    if (id_sector) {
      fields.push('id_sector = $3');
      values.push(id_sector);
    }

    if (id_category) {
      fields.push('id_category = $4');
      values.push(id_category);
    }
    if (subject) {
      fields.push('subject = $5');
      values.push(subject);
    }

    if (status) {
      fields.push('status = $6');
      values.push(status);
    }

    if (fields.length === 0) {
      throw new Error('At least one field must be provided to update an Call.');
    }

    values.push(id);

    const query = `
      UPDATE calls
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
    `;

    await connection.query(query, values);
  }
}
