import { hash } from 'bcrypt';
import AppError from '../../../api/errors/AppError';
import { ICreateRequester } from '../domain/models';
import { RequestersRepository } from '../infra/repositories/RequestersRepository';

export class CreateRequesterService {
  constructor(private requestersRepository: RequestersRepository) {}

  public async execute({ name, email, password }: ICreateRequester) {
    const emailAlreadyExists = await this.requestersRepository.findByEmail(
      email
    );

    if (emailAlreadyExists) {
      throw new AppError('Email already in use.', 409);
    }

    const passwordHashed = await hash(password, +process.env.SALT_ROUNDS);

    const requester = await this.requestersRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    return requester;
  }
}
