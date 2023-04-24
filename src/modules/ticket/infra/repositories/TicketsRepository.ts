import { connection } from 'api/database/connection';
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
    agent_id,
    sector_id,
    status,
    subject,
    content,
  }: ICreateTicket): Promise<ITicket> {
    const { rows } = await connection.query(
      `INSERT INTO tickets (
        requester_id,
        category_id,
        agent_id,
        sector_id,
        status,
        subject,
        content,
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [requester_id, category_id, agent_id, sector_id, status, subject, content]
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
  }: IUpdateTicket & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    if (requester_id) {
      fields.push('requester_id = $1');
      values.push(requester_id);
    }

    if (category_id) {
      fields.push('category_id = $2');
      values.push(category_id);
    }
    if (agent_id) {
      fields.push('agent_id = $3');
      values.push(agent_id);
    }

    if (sector_id) {
      fields.push('sector_id = $4');
      values.push(sector_id);
    }

    if (status) {
      fields.push('status = $5');
      values.push(status);
    }

    if (subject) {
      fields.push('subject = $6');
      values.push(subject);
    }

    if (content) {
      fields.push('content = $7');
      values.push(content);
    }

    if (fields.length === 0) {
      throw new Error(
        'At least one field must be provided to update an Ticket.'
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
