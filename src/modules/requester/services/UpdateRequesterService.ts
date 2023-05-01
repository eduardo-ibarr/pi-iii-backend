import AppError from '../../../api/errors/AppError';
import { IUpdateRequester } from '../domain/models';
import { RequestersRepository } from '../infra/repositories/RequestersRepository';

export class UpdateRequesterService {
  constructor(private requestersRepository: RequestersRepository) {}

  public async execute({
    id,
    email,
    name,
    password,
  }: IUpdateRequester & { id: string }): Promise<void> {
    const requester = await this.requestersRepository.findById(id);

    if (!requester) {
      throw new AppError('Requester not found.');
    }

    if (email) {
      const emailAlreadyExists = await this.requestersRepository.findByEmail(
        email
      );

      if (emailAlreadyExists && email !== requester.email) {
        throw new AppError('Email already in use.', 409);
      }
    }

    await this.requestersRepository.update({
      id,
      email,
      name,
      password,
    });
  }
}
