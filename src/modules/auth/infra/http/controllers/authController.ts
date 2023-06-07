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
    const { email, password } = request.body;
    const service = this.authServicesFactory.login();

    const data = await service.execute({
      email,
      password,
    });

    const { auth, expiresIn, token } = data;

    if (!auth || !token) {
      throw new AppError('Incorrect email or password.', 401);
    }

    return response.status(200).json({ token, expiresIn });
  }

  async logoff(request: Request, response: Response) {
    blacklist.push(request.body.token);

    return response.status(200).json({ message: 'Logged off successfully.' });
  }
}
