import { Request, Response } from 'express';
import AppError from '../../../../../api/errors/AppError';
import { blacklist } from '../../../../../utils/blacklist';

import { IAuthController } from '../../../domain/controllers/IAuthController';
import { IAuthServicesFactory } from '../../../domain/factories/IAuthFactory';

export class AuthController implements IAuthController {
  constructor(private authServicesFactory: IAuthServicesFactory) {
    this.login = this.login.bind(this);
    this.logoff = this.logoff.bind(this);
  }

  async login(request: Request, response: Response) {
    const { email, password, type_of_user } = request.body;
    const service = this.authServicesFactory.login();

    const data = await service.execute({
      email,
      password,
      type_of_user,
    });

    const { auth, expiresIn, refreshToken, token, userId } = data;

    if (!auth || !token || !refreshToken) {
      throw new AppError('Incorrect email or password.', 401);
    }

    response.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    return response
      .status(200)
      .json({ token, expiresIn, typeOfUser: type_of_user, userId });
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
