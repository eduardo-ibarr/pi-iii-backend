import { connection } from 'api/database/connection';
import { IAgent, ICreateAgent, IUpdateAgent } from '../../domain/models';
import { IAgentsRepository } from '../../domain/repositories/IAgentsRepository';

export class AgentsRepository implements IAgentsRepository {
  async findById(id: string): Promise<IAgent | null> {
    const { rows } = await connection.query(
      'SELECT * FROM agents WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async delete(id: string): Promise<void> {
    await connection.query('DELETE FROM agents WHERE id = $1', [id]);
  }

  async list(): Promise<IAgent[]> {
    const { rows } = await connection.query('SELECT * FROM agents');
    return rows;
  }

  async create({
    email,
    name,
    password,
    tickets_active,
    tickets_finished,
  }: ICreateAgent): Promise<IAgent> {
    const { rows } = await connection.query(
      `INSERT INTO agents (
        email,
        name,
        password,
        tickets_active,
        tickets_finished,
      ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [email, name, password, tickets_active, tickets_finished]
    );
    return rows[0];
  }

  async update({
    id,
    email,
    name,
    password,
    tickets_active,
    tickets_finished,
  }: IUpdateAgent & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    if (email) {
      fields.push('email = $1');
      values.push(email);
    }

    if (name) {
      fields.push('name = $2');
      values.push(name);
    }
    if (password) {
      fields.push('password = $3');
      values.push(password);
    }

    if (tickets_active) {
      fields.push('tickets_active = $4');
      values.push(tickets_active);
    }
    if (tickets_finished) {
      fields.push('tickets_finished = $5');
      values.push(tickets_finished);
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
