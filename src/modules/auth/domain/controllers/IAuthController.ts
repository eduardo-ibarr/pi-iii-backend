import { Request, Response } from 'express';

export interface IAuthController {
  login(request: Request, response: Response): Promise<Response>;
  logoff(request: Request, response: Response): Promise<Response>;
}
