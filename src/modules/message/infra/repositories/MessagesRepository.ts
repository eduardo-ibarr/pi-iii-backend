import { connection } from 'api/database/connection';
import { IMessage, ICreateMessage, IUpdateMessage } from '../../domain/models';
import { IMessagesRepository } from '../../domain/repositories/IMessagesRepository';

export class MessagesRepository implements IMessagesRepository {
  async findById(id: string): Promise<IMessage | null> {
    const { rows } = await connection.query(
      'SELECT * FROM messages WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM messages WHERE id = $1', [id]);
  }

  async findAll(): Promise<IMessage[]> {
    const { rows } = await connection.query('SELECT * FROM messages');
    return rows;
  }

  async create({
    content,
    conversation_id,
    read_status,
    sender,
    ticket_id,
  }: ICreateMessage): Promise<IMessage> {
    const { rows } = await connection.query(
      `INSERT INTO messages (
        content,
        conversation_id,
        read_status,
        sender,
        ticket_id,
      ) VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [content, conversation_id, read_status, sender, ticket_id]
    );
    return rows[0];
  }

  async update({
    content,
    conversation_id,
    read_status,
    sender,
    ticket_id,
    id,
  }: IUpdateMessage & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    if (content) {
      fields.push('content = $2');
      values.push(content);
    }

    if (conversation_id) {
      fields.push('conversation_id = $1');
      values.push(conversation_id);
    }

    if (read_status) {
      fields.push('read_status = $3');
      values.push(read_status);
    }

    if (sender) {
      fields.push('sender = $4');
      values.push(sender);
    }

    if (ticket_id) {
      fields.push('ticket_id = $5');
      values.push(ticket_id);
    }

    if (fields.length === 0) {
      throw new Error(
        'At least one field must be provided to update an message.'
      );
    }

    values.push(id);

    const query = `
      UPDATE messages
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
    `;

    await connection.query(query, values);
  }
}
