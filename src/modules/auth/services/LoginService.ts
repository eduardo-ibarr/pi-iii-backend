import { sign } from 'jsonwebtoken';

import AppError from '../../../api/errors/AppError';
import { ILoginService } from '../domain/services/ILoginService';

import { IAgentsRepository } from '../../agent/domain/repositories/IAgentsRepository';
import { IHashProvider } from '../../../providers/HashProvider/models/IHashProvider';
import { ILoginRequestDTO } from '../domain/dtos/ILoginRequestDTO';
import { IRequestersRepository } from '../../requester/domain/repositories/IRequestersRepository';
import { ILoginResponseDTO } from '../domain/dtos/ILoginResponseDTO';
import { IAdminsRepository } from '../../admins/domain/repositories/IAdminsRepository';

export class LoginService implements ILoginService {
  constructor(
    private requestersRepository: IRequestersRepository,
    private agentsRepository: IAgentsRepository,
    private adminsRepository: IAdminsRepository,
    private hashProvider: IHashProvider
  ) {}

  async execute({
    email,
    password,
  }: ILoginRequestDTO): Promise<ILoginResponseDTO> {
    const isAgent = await this.agentsRepository.findByEmailReturningAuthData(
      email
    );
    const isRequester =
      await this.requestersRepository.findByEmailReturningAuthData(email);
    const isAdmin = await this.adminsRepository.findByEmailReturningAuthData(
      email
    );

    let user;

    if (isAgent) {
      user = {
        data: isAgent,
        type: 'agent',
      };
    } else if (isAdmin) {
      user = {
        data: isAdmin,
        type: 'admin',
      };
    } else if (isRequester) {
      user = {
        data: isRequester,
        type: 'requester',
      };
    }

    if (!user) {
      throw new AppError('User not exists.', 404);
    }

    const isValidPassword = await this.hashProvider.compareHash(
      password,
      user.data.password
    );

    if (user.data.email === email && isValidPassword) {
      const token = sign(
        { userId: user.data.id, typeOfUser: user.type },
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
