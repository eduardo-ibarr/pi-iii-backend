import AppError from '../../../../api/errors/AppError';
import { connection } from '../../../../api/database/connection';
import {
  IResponseConversationDTO,
  ICreateConversationDTO,
  IUpdateConversationDTO,
} from '../../domain/dtos';
import { IConversationsRepository } from '../../domain/repositories/IConversationsRepository';

export class ConversationsRepository implements IConversationsRepository {
  async findByTicket(ticket: string): Promise<IResponseConversationDTO | null> {
    const { rows } = await connection.query(
      'SELECT * FROM conversations WHERE ticket_id = $1',
      [ticket]
    );
    return rows[0] || null;
  }

  async findById(id: string): Promise<IResponseConversationDTO | null> {
    const { rows } = await connection.query(
      'SELECT * FROM conversations WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM conversations WHERE id = $1', [id]);
  }

  async findAll(): Promise<IResponseConversationDTO[]> {
    const { rows } = await connection.query('SELECT * FROM conversations');
    return rows;
  }

  async create({
    ticket_id,
  }: ICreateConversationDTO): Promise<IResponseConversationDTO> {
    const { rows } = await connection.query(
      `INSERT INTO conversations (
        ticket_id
      ) VALUES ($1) RETURNING *`,
      [ticket_id]
    );
    return rows[0];
  }

  async update({
    ticket_id,
    id,
  }: IUpdateConversationDTO): Promise<IResponseConversationDTO> {
    const fields = [];
    const values = [];

    let i = 1;

    if (ticket_id) {
      fields.push(`ticket_id = $${i}`);
      values.push(ticket_id);
      i++;
    }

    if (fields.length === 0) {
      throw new AppError(
        'At least one field must be provided to update an conversation.'
      );
    }

    values.push(id);

    const query = `
      UPDATE conversations
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
      RETURNING *
    `;

    const { rows } = await connection.query(query, values);

    const conversationUpdated: IResponseConversationDTO = rows[0];

    return conversationUpdated;
  }
}
