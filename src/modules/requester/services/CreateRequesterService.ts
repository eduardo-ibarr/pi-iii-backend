import { hash } from 'bcrypt';
import AppError from '../../../api/errors/AppError';
import { ICreateRequesterDTO, IResponseRequesterDTO } from '../domain/dtos';
import { ICreateRequesterService } from '../domain/services';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';
import { IRequestersRepository } from '../domain/repositories/IRequestersRepository';

export class CreateRequesterService implements ICreateRequesterService {
  constructor(
    private requestersRepository: IRequestersRepository,
    private hashProvider: IHashProvider
  ) {}

  public async execute({
    name,
    email,
    password,
  }: ICreateRequesterDTO): Promise<IResponseRequesterDTO> {
    const emailAlreadyExists = await this.requestersRepository.findByEmail(
      email
    );

    if (emailAlreadyExists) {
      throw new AppError('Email already in use.', 409);
    }

    const passwordHashed = await this.hashProvider.generateHash(password);

    const requester = await this.requestersRepository.create({
      name,
      email,
      password: passwordHashed,
    });

    return requester;
  }
}
