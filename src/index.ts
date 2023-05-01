import 'express-async-errors';
import express, { Request, Response } from 'express';
import { errors } from 'celebrate';
import { logs } from './api/middlewares/logs';
import { errorHandling } from './api/middlewares/errorHandling';

import {
  agentsRoutes,
  categoriesRoutes,
  conversationsRoutes,
  messagesRoutes,
  requestersRoutes,
  sectorsRoutes,
  ticketsRoutes,
  agentTicketHistoriesRoutes,
} from './modules';

const app = express();

const API_PORT = process.env.PORT || process.env.port || 3333;

app.use(express.json());
app.use(logs);

app.get('/', (request: Request, response: Response) => {
  return response
    .status(200)
    .json({ message: 'This is the root path of the API.' });
});

app.use('/agents', agentsRoutes);
app.use('/categories', categoriesRoutes);
app.use('/conversations', conversationsRoutes);
app.use('/messages', messagesRoutes);
app.use('/requesters', requestersRoutes);
app.use('/sectors', sectorsRoutes);
app.use('/tickets', ticketsRoutes);
app.use('/agent-ticket-histories', agentTicketHistoriesRoutes);

app.use(errors());
app.use(errorHandling);

app.listen(API_PORT, () => console.log(`Server listening on ${API_PORT}. `));
