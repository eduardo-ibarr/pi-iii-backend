import 'express-async-errors';
import express, { Request, Response } from 'express';
import { errors } from 'celebrate';
import cors from 'cors';
import { logs } from './api/middlewares/logs';
import { verifyJWT } from './api/middlewares/verifyJWT';
import { errorHandling } from './api/middlewares/errorHandling';
import swaggerUi from 'swagger-ui-express';
import swaggerFile from './api/docs/swagger_output.json';

import {
  agentsRoutes,
  categoriesRoutes,
  conversationsRoutes,
  messagesRoutes,
  requestersRoutes,
  sectorsRoutes,
  ticketsRoutes,
  agentTicketHistoriesRoutes,
  authRoutes,
} from './modules';
import AppError from './api/errors/AppError';

const app = express();

const API_PORT = process.env.PORT || process.env.port || 3333;

const allowedOrigins = [
  'http://localhost:3000',
  'https://sistemadevendas.com',
  'http://sistemadevendas.com',
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (allowedOrigins.indexOf(origin) === -1) {
        return callback(
          new AppError('Access denied by CORS.', 409) as unknown as Error,
          false
        );
      }

      return callback(null, true);
    },
  })
);

app.use(logs);
app.use(express.json());

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.get('/', (request: Request, response: Response) => {
  return response
    .status(200)
    .json({ message: 'This is the root path of the API.' });
});

app.use(authRoutes);

app.use(verifyJWT);

app.use(agentsRoutes);
app.use(categoriesRoutes);
app.use(conversationsRoutes);
app.use(messagesRoutes);
app.use(requestersRoutes);
app.use(sectorsRoutes);
app.use(ticketsRoutes);
app.use(agentTicketHistoriesRoutes);

app.use(errors());
app.use(errorHandling);

app.listen(API_PORT, () => console.log(`Server listening on ${API_PORT}. `));
