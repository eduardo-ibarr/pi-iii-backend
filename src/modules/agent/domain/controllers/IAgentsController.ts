import { Request, Response } from 'express';

export interface IAgentsController {
  index(request: Request, response: Response): Promise<Response>;
  show(request: Request, response: Response): Promise<Response>;
  store(request: Request, response: Response): Promise<Response>;
  delete(request: Request, response: Response): Promise<Response>;
  update(request: Request, response: Response): Promise<Response>;
  updatePassword(request: Request, response: Response): Promise<Response>;
}
