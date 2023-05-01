import AppError from '../../../../api/errors/AppError';
import { connection } from '../../../../api/database/connection';
import {
  IAgentTicketHistory,
  ICreateAgentTicketHistory,
  IUpdateAgentTicketHistory,
} from '../../domain/models';
import { IAgentTicketHistoriesRepository } from '../../domain/repositories/IAgentTicketHistoriesRepository';

export class AgentTicketHistoriesRepository
  implements IAgentTicketHistoriesRepository
{
  async findById(id: string): Promise<IAgentTicketHistory | null> {
    const { rows } = await connection.query(
      'SELECT * FROM agent_ticket_history WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM agent_ticket_history WHERE id = $1', [
      id,
    ]);
  }

  async findAll(): Promise<IAgentTicketHistory[]> {
    const { rows } = await connection.query(
      'SELECT * FROM agent_ticket_history'
    );
    return rows;
  }

  async create({
    agent_id,
    ticket_id,
  }: ICreateAgentTicketHistory): Promise<IAgentTicketHistory> {
    const { rows } = await connection.query(
      `INSERT INTO agent_ticket_history (
        agent_id,
        ticket_id,
      ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [agent_id, ticket_id]
    );
    return rows[0];
  }

  async update({
    id,
    agent_id,
    ticket_id,
  }: IUpdateAgentTicketHistory & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    let i = 1;

    if (agent_id) {
      fields.push(`agent_id = $${i}`);
      values.push(agent_id);
      i++;
    }

    if (ticket_id) {
      fields.push(`ticket_id = $${i}`);
      values.push(ticket_id);
      i++;
    }

    if (fields.length === 0) {
      throw new AppError(
        'At least one field must be provided to update an Agent-Ticket history.'
      );
    }

    values.push(id);

    const query = `
      UPDATE agent_ticket_history
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
    `;

    await connection.query(query, values);
  }
}
