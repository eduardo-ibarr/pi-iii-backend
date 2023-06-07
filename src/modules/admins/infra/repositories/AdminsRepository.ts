import AppError from '../../../../api/errors/AppError';
import { connection } from '../../../../api/database/connection';
import {
  IResponseAdminDTO,
  ICreateAdminDTO,
  IUpdateAdminDTO,
  IAdminAuthDTO,
} from '../../domain/dtos';
import { IAdminsRepository } from '../../domain/repositories/IAdminsRepository';

export class AdminsRepository implements IAdminsRepository {
  async findByEmailReturningAuthData(
    email: string
  ): Promise<IAdminAuthDTO | null> {
    const { rows } = await connection.query(
      'SELECT id, email, password FROM admins WHERE email = $1',
      [email]
    );
    return rows[0] || null;
  }

  async findByEmail(email: string): Promise<IResponseAdminDTO | null> {
    const { rows } = await connection.query(
      'SELECT id, name, email, created_at, updated_at FROM admins WHERE email = $1',
      [email]
    );
    return rows[0] || null;
  }

  async findById(id: string): Promise<IResponseAdminDTO | null> {
    const { rows } = await connection.query(
      'SELECT id, name, email, created_at, updated_at FROM admins WHERE id = $1',
      [id]
    );
    return rows[0] || null;
  }

  async remove(id: string): Promise<void> {
    await connection.query('DELETE FROM admins WHERE id = $1', [id]);
  }

  async findAll(): Promise<IResponseAdminDTO[]> {
    const { rows } = await connection.query(
      'SELECT id, name, email, created_at, updated_at FROM admins'
    );
    return rows;
  }

  async create({
    name,
    email,
    password,
  }: ICreateAdminDTO): Promise<IResponseAdminDTO> {
    const { rows } = await connection.query(
      `INSERT INTO admins (
        name,
        email,
        password
      ) VALUES ($1, $2, $3) RETURNING id, name, email, created_at, updated_at`,
      [name, email, password]
    );
    return rows[0];
  }

  async update({
    name,
    email,
    password,
    id,
  }: IUpdateAdminDTO): Promise<IResponseAdminDTO> {
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

    if (fields.length === 0) {
      throw new AppError(
        'At least one field must be provided to update an Admin.'
      );
    }

    values.push(id);

    const query = `
      UPDATE admins
      SET ${fields.join(', ')}
      WHERE id = $${values.length}
      RETURNING *
    `;

    const { rows } = await connection.query(query, values);

    const adminUpdated: IResponseAdminDTO = rows[0];

    return adminUpdated;
  }
}
