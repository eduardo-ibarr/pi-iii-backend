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
    author,
    content,
    id_conversation,
    type_of_author,
  }: ICreateMessage): Promise<IMessage> {
    const { rows } = await connection.query(
      `INSERT INTO messages (
        author,
        content,
        id_conversation,
        type_of_author,
      ) VALUES ($1, $2, $3, $4) RETURNING *`,
      [author, content, id_conversation, type_of_author]
    );
    return rows[0];
  }

  async update({
    author,
    content,
    id_conversation,
    type_of_author,
    id,
  }: IUpdateMessage & { id: string }): Promise<void> {
    const fields = [];
    const values = [];

    if (author) {
      fields.push('author = $1');
      values.push(author);
    }

    if (content) {
      fields.push('content = $2');
      values.push(content);
    }

    if (id_conversation) {
      fields.push('id_conversation = $3');
      values.push(id_conversation);
    }

    if (type_of_author) {
      fields.push('type_of_author = $4');
      values.push(type_of_author);
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
