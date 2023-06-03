import cors from 'cors';
import AppError from '../errors/AppError';

export const corsBlock = () => {
  const allowedOrigins = [
    'http://localhost:3000',
    'https://www.sistemadevendas.com',
    'http://sistemadevendas.com',
  ];

  return cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(
          new AppError('Access denied by CORS.', 409) as unknown as Error,
          false
        );
      }

      return callback(null, true);
    },
  });
};
