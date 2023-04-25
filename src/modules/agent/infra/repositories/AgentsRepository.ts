import { connection } from 'api/database/connection';
import { IAgent, ICreateAgent, IUpdateAgent } from '../../domain/models';
import { IAgentsRepository } from '../../domain/repositories/IAgentsRepository';

export class AgentsRepository implements IAgentsRepository {
  async findByEmail(email: string): Promise<IAgent | null> {
    const { rows } = await connection.query(
      'SELECT * FROM agents WHERE email = $1',
      [email]
    );
    return rows[0] || null;
  }

  async findById(id: string): Promise<IAgent | null> {
    const { rows } = await connection.query(
      'SELECT * FROM agents WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM agents WHERE id = $1', [id]);
  }

  async findAll(): Promise<IAgent[]> {
    const { rows } = await connection.query('SELECT * FROM agents');
    return rows;
  }

  async create({
    name,
    ticket_history,
    email,
    password,
    available,
  }: ICreateAgent): Promise<IAgent> {
    const { rows } = await connection.query(
      `INSERT INTO agents (
        name,
        ticket_history,
        email,
        password,
        available
      ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [name, ticket_history, email, password, available]
    );
    return rows[0];
  }

  async update({
    id,
    name,
    ticket_history,
    email,
    password,
    available,
  }: IUpdateAgent & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    if (name) {
      fields.push('name = $1');
      values.push(name);
    }

    if (ticket_history) {
      fields.push('ticket_history = $2');
      values.push(ticket_history);
    }

    if (email) {
      fields.push('email = $3');
      values.push(email);
    }

    if (password) {
      fields.push('password = $4');
      values.push(password);
    }

    if (available) {
      fields.push('available = $5');
      values.push(available);
    }

    if (fields.length === 0) {
      throw new Error(
        'At least one field must be provided to update an Agent.'
      );
    }

    values.push(id);

    const query = `
      UPDATE agents
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
    `;

    await connection.query(query, values);
  }
}
