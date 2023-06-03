import { compare, hash } from 'bcrypt';
import { IHashProvider } from '../models/IHashProvider';
import { config } from 'dotenv';

config();

export class BcryptHashProvider implements IHashProvider {
  public async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed);
  }

  public async generateHash(payload: string): Promise<string> {
    return hash(payload, +process.env.SALT_ROUNDS);
  }
}
