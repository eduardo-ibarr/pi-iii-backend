import { Request, Response } from 'express';
import { LoginService } from '../../../../../modules/auth/services/login';
import AppError from '../../../../../api/errors/AppError';
import { blacklist } from '../../../../../utils/blacklist';

import { AgentsRepository } from '../../../../agent/infra/repositories/AgentsRepository';
import { RequestersRepository } from '../../../../requester/infra/repositories/RequestersRepository';

const requestersRepository = new RequestersRepository();
const agentsRepository = new AgentsRepository();

class AuthController {
  async login(request: Request, response: Response) {
    const { email, password, type_of_user } = request.body;

    const { auth, token, refreshToken, expiresIn } = await new LoginService(
      requestersRepository,
      agentsRepository
    ).execute({ email, password, type_of_user });

    if (!auth || !token || !refreshToken) {
      throw new AppError('Incorrect email or password.', 401);
    }

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return response.status(200).json({ token, expiresIn });
  }

  async logoff(request: Request, response: Response) {
    const refreshToken = request.cookies.refreshToken;

    if (!refreshToken) {
      throw new AppError('No refresh token provided.', 401);
    }

    blacklist.push(refreshToken);

    response.clearCookie('refreshToken', {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return response.status(200).json({ message: 'Logged off successfully.' });
  }
}

export default AuthController;
