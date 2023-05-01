import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { blacklist } from '../../utils/blacklist';
import AppError from '../errors/AppError';

require('dotenv').config();

export const verifyJWT = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const token = request.headers['x-access-token'];

  if (!token) {
    throw new AppError('Header x-access-token is required.', 400);
  }

  const index = blacklist.findIndex((item: any) => item === token);

  if (index !== -1) {
    throw new AppError('Access unauthorized.', 401);
  }

  verify(token as string, process.env.SECRET, (err, decoded) => {
    if (err) {
      throw new AppError('Access unauthorized.', 401);
    }

    request.user = {
      id: decoded as string,
    };

    next();
  });
};
