import 'express-async-errors';
import express, { Request, Response } from 'express';
import { errors } from 'celebrate';
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
  authRoutes,
  adminsRoutes,
} from './modules';
import { corsBlock } from './api/middlewares/cors';

const app = express();

const API_PORT = process.env.PORT || process.env.port || 3333;

app.use(corsBlock());

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

app.use(adminsRoutes);
app.use(ticketsRoutes);
app.use(requestersRoutes);
app.use(messagesRoutes);
app.use(agentsRoutes);
app.use(categoriesRoutes);
app.use(conversationsRoutes);
app.use(sectorsRoutes);

app.use(errors());
app.use(errorHandling);

app.listen(API_PORT, () => console.log(`Server listening on ${API_PORT}. `));
