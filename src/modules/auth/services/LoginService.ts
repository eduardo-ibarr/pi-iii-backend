import { sign } from 'jsonwebtoken';

import AppError from '../../../api/errors/AppError';
import { ILoginService } from '../domain/services/ILoginService';

import { IAgentsRepository } from '../../agent/domain/repositories/IAgentsRepository';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';
import { ILoginRequestDTO } from '../domain/dtos/ILoginRequestDTO';
import { IRequestersRepository } from '../../requester/domain/repositories/IRequestersRepository';
import { ILoginResponseDTO } from '../domain/dtos/ILoginResponseDTO';

export class LoginService implements ILoginService {
  constructor(
    private requestersRepository: IRequestersRepository,
    private agentsRepository: IAgentsRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute({
    email,
    password,
    type_of_user,
  }: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    const data =
      type_of_user === 'agent'
        ? await this.agentsRepository.findByEmailReturningAuthData(email)
        : await this.requestersRepository.findByEmailReturningAuthData(email);

    if (!data) {
      throw new AppError(
        `${
          type_of_user.charAt(0).toUpperCase() + type_of_user.slice(1)
        } not exists.`,
        404
      );
    }

    const isValidPassword = await this.hashProvider.compareHash(
      password,
      data.password
    );

    if (data.email === email && isValidPassword) {
      const token = sign(
        { userId: data.id, typeOfUser: type_of_user },
        process.env.SECRET,
        {
          expiresIn: 8000,
        }
      );

      return {
        auth: true,
        token,
        expiresIn: 8000,
      };
    }

    throw new AppError('Invalid email or password.', 401);
  }
}
