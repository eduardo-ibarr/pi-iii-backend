import { connection } from 'api/database/connection';
import {
  IConversation,
  ICreateConversation,
  IUpdateConversation,
} from '../../domain/models';
import { IConversationsRepository } from '../../domain/repositories/IConversationsRepository';

export class ConversationsRepository implements IConversationsRepository {
  async findById(id: string): Promise<IConversation | null> {
    const { rows } = await connection.query(
      'SELECT * FROM conversations WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM conversations WHERE id = $1', [id]);
  }

  async findAll(): Promise<IConversation[]> {
    const { rows } = await connection.query('SELECT * FROM conversations');
    return rows;
  }

  async create({
    history,
    id_agent,
    id_requester,
    messages_amount,
  }: ICreateConversation): Promise<IConversation> {
    const { rows } = await connection.query(
      `INSERT INTO conversations (
        history,
        id_agent,
        id_requester,
        messages_amount,
      ) VALUES ($1, $2, $3, $4) RETURNING *`,
      [history, id_agent, id_requester, messages_amount]
    );
    return rows[0];
  }

  async update({
    history,
    id_agent,
    id_requester,
    messages_amount,
    id,
  }: IUpdateConversation & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    if (history) {
      fields.push('history = $1');
      values.push(history);
    }

    if (id_agent) {
      fields.push('id_agent = $2');
      values.push(id_agent);
    }

    if (id_requester) {
      fields.push('id_requester = $3');
      values.push(id_requester);
    }

    if (messages_amount) {
      fields.push('messages_amount = $4');
      values.push(messages_amount);
    }

    if (fields.length === 0) {
      throw new Error(
        'At least one field must be provided to update an conversation.'
      );
    }

    values.push(id);

    const query = `
      UPDATE conversations
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
    `;

    await connection.query(query, values);
  }
}
