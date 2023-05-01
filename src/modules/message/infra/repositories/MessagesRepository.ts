import AppError from '../../../../api/errors/AppError';
import { connection } from '../../../../api/database/connection';
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

    let i = 1;

    if (content) {
      fields.push(`content = $${i}`);
      values.push(content);
      i++;
    }

    if (conversation_id) {
      fields.push(`conversation_id = $${i}`);
      values.push(conversation_id);
      i++;
    }

    if (typeof read_status === 'boolean') {
      fields.push(`read_status = $${i}`);
      values.push(read_status);
      i++;
    }

    if (sender) {
      fields.push(`sender = $${i}`);
      values.push(sender);
      i++;
    }

    if (ticket_id) {
      fields.push(`ticket_id = $${i}`);
      values.push(ticket_id);
      i++;
    }

    if (fields.length === 0) {
      throw new AppError(
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
