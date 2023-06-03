import { connection } from '../../../../api/database/connection';
import { IAgentsRepository } from '../../domain/repositories/IAgentsRepository';
import { QueryResult } from 'pg';
import AppError from '../../../../api/errors/AppError';
import {
  IAgentAuthDTO,
  ICreateAgentDTO,
  IReturnAgentDTO,
  IUpdateAgentDTO,
} from '../../domain/dtos';

export class AgentsRepository implements IAgentsRepository {
  async findByEmailReturningAuthData(
    email: string
  ): Promise<IAgentAuthDTO | null> {
    const { rows } = await connection.query(
      'SELECT id, email, password FROM agents WHERE email = $1;',
      [email]
    );
    return rows[0] || null;
  }

  async findByEmail(email: string): Promise<IReturnAgentDTO | null> {
    const { rows } = await connection.query(
      `SELECT
        id,
        name,
        email,
        available,
        created_at,
        updated_at 
      FROM agents WHERE email = $1`,
      [email]
    );
    return rows[0] || null;
  }

  async findById(id: string): Promise<IReturnAgentDTO | null> {
    const { rows } = await connection.query(
      `SELECT 
        id,
        name,
        email,
        available,
        created_at,
        updated_at
      FROM agents WHERE id = $1`,
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<QueryResult<IReturnAgentDTO>> {
    const response = await connection.query(
      'DELETE FROM agents WHERE id = $1',
      [id]
    );
    return response;
  }

  async findAll(): Promise<IReturnAgentDTO[]> {
    const { rows } = await connection.query(
      `SELECT 
        id,
        name,
        email,
        available,
        created_at,
        updated_at
      FROM agents;         
    `
    );
    return rows;
  }

  async create({
    name,
    email,
    password,
    available,
  }: ICreateAgentDTO): Promise<IReturnAgentDTO> {
    const { rows } = await connection.query(
      `INSERT INTO agents (
        name,
        email,
        password,
        available
      ) VALUES ($1, $2, $3, $4) RETURNING
        id,
        name,
        email,
        available,
        created_at,
        updated_at;`,
      [name, email, password, available]
    );
    return rows[0];
  }

  async update({
    id,
    name,
    email,
    password,
    available,
  }: IUpdateAgentDTO): Promise<IReturnAgentDTO> {
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

    if (typeof available === 'boolean') {
      fields.push(`available = $${i}`);
      values.push(available);
      i++;
    }

    if (fields.length === 0) {
      throw new AppError(
        'At least one field must be provided to update an agent.'
      );
    }

    values.push(id);

    const query = `
      UPDATE agents
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
      RETURNING
        id,
        name,
        email,
        available,
        created_at,
        updated_at;
    `;

    const { rows } = await connection.query(query, values);

    const agentUpdated: IReturnAgentDTO = rows[0];

    return agentUpdated;
  }
}
