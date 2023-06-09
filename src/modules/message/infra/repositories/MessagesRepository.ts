import AppError from '../../../../api/errors/AppError';
import { connection } from '../../../../api/database/connection';
import {
  ICreateMessageDTO,
  IResponseMessageDTO,
  IUpdateMessageDTO,
} from '../../domain/dtos';
import { IMessagesRepository } from '../../domain/repositories/IMessagesRepository';

export class MessagesRepository implements IMessagesRepository {
  async findByConversation(id: string): Promise<IResponseMessageDTO[]> {
    const { rows } = await connection.query(
      'SELECT * FROM messages WHERE conversation_id = $1',
      [id]
    );
    return rows;
  }

  async findById(id: string): Promise<IResponseMessageDTO | null> {
    const { rows } = await connection.query(
      'SELECT * FROM messages WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM messages WHERE id = $1', [id]);
  }

  async findAll(): Promise<IResponseMessageDTO[]> {
    const { rows } = await connection.query('SELECT * FROM messages');
    return rows;
  }

  async create({
    content,
    conversation_id,
    read_status,
    sender,
  }: ICreateMessageDTO): Promise<IResponseMessageDTO> {
    const { rows } = await connection.query(
      `INSERT INTO messages (
        content,
        conversation_id,
        read_status,
        sender
      ) VALUES ($1, $2, $3, $4) RETURNING *`,
      [content, conversation_id, read_status, sender]
    );
    return rows[0];
  }

  async update({
    content,
    conversation_id,
    read_status,
    sender,
    id,
  }: IUpdateMessageDTO): Promise<IResponseMessageDTO> {
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
      RETURNING *
    `;

    const { rows } = await connection.query(query, values);

    const messageUpdated: IResponseMessageDTO = rows[0];

    return messageUpdated;
  }
}
