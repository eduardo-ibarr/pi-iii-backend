import { NextFunction, Request, Response } from 'express';

export function logs(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  console.log(
    `[${request.method}] to ${request.path} with status ${
      request.statusCode
    } from ${request.ip} at ${new Date().toLocaleString('pt-br')}.`
  );
  next();
}
