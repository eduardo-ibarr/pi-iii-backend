import AppError from '../../../../api/errors/AppError';
import { connection } from '../../../../api/database/connection';
import { ITicket, ICreateTicket, IUpdateTicket } from '../../domain/models';
import { ITicketsRepository } from '../../domain/repositories/ITicketsRepository';

export class TicketsRepository implements ITicketsRepository {
  async findById(id: string): Promise<ITicket | null> {
    const { rows } = await connection.query(
      'SELECT * FROM tickets WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM tickets WHERE id = $1', [id]);
  }

  async findAll(): Promise<ITicket[]> {
    const { rows } = await connection.query('SELECT * FROM tickets');
    return rows;
  }

  async create({
    requester_id,
    category_id,
    sector_id,
    status,
    subject,
    content,
  }: ICreateTicket): Promise<ITicket> {
    const { rows } = await connection.query(
      `INSERT INTO tickets (
        requester_id,
        category_id,
        sector_id,
        status,
        subject,
        content
      ) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [requester_id, category_id, sector_id, status, subject, content]
    );
    return rows[0];
  }

  async update({
    id,
    requester_id,
    category_id,
    agent_id,
    sector_id,
    status,
    subject,
    content,
    read_status,
  }: IUpdateTicket & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    let i = 1;

    if (requester_id) {
      fields.push(`requester_id = $${i}`);
      values.push(requester_id);
      i++;
    }

    if (category_id) {
      fields.push(`category_id = $${i}`);
      values.push(category_id);
      i++;
    }

    if (typeof read_status === 'boolean') {
      fields.push(`read_status = $${i}`);
      values.push(read_status);
      i++;
    }

    if (agent_id) {
      fields.push(`agent_id = $${i}`);
      values.push(agent_id);
      i++;
    }

    if (sector_id) {
      fields.push(`sector_id = $${i}`);
      values.push(sector_id);
      i++;
    }

    if (status) {
      fields.push(`status = $${i}`);
      values.push(status);
      i++;
    }

    if (content) {
      fields.push(`content = $${i}`);
      values.push(content);
      i++;
    }

    if (subject) {
      fields.push(`subject = $${i}`);
      values.push(subject);
      i++;
    }

    if (fields.length === 0) {
      throw new AppError(
        'At least one field must be provided to update an ticket.'
      );
    }

    values.push(id);

    const query = `
      UPDATE tickets
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
    `;

    await connection.query(query, values);
  }
}
