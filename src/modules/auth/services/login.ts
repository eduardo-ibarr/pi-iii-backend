import { ILogin } from '../domain/models/ILogin';

import { sign } from 'jsonwebtoken';

import { AgentsRepository } from '../../../modules/agent/infra/repositories/AgentsRepository';
import { RequestersRepository } from '../../../modules/requester/infra/repositories/RequestersRepository';

import AppError from '../../../api/errors/AppError';
import { compare } from 'bcrypt';
import { IReturnAgentDTO } from '../../agent/domain/dtos';
import { IRequester } from '../../requester/domain/models';

export class LoginService {
  constructor(
    private requestersRepository: RequestersRepository,
    private agentsRepository: AgentsRepository
  ) {}

  async execute({ email, password, type_of_user }: ILogin) {
    const user: IReturnAgentDTO | IRequester | null =
      type_of_user === 'agent'
        ? await this.agentsRepository.findByEmail(email)
        : await this.requestersRepository.findByEmail(email);

    if (!user) {
      throw new AppError(
        `${
          type_of_user.charAt(0).toUpperCase() + type_of_user.slice(1)
        } not exists.`,
        404
      );
    }

    const isValidPassword = await compare(password, user.password);

    if (user.email === email && isValidPassword) {
      const token = sign({ userID: user.id }, process.env.SECRET, {
        expiresIn: 3600,
      });

      const refreshToken = sign({ userID: user.id }, process.env.SECRET, {
        expiresIn: 86400,
      });

      return {
        auth: true,
        token,
        expiresIn: 3600,
        refreshToken,
        userId: user.id,
      };
    }

    throw new AppError('Invalid email or password.', 401);
  }
}
