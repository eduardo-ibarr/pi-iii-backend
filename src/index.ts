import 'express-async-errors';
import express, { Request, Response } from 'express';
import { errors } from 'celebrate';
import { logs } from './api/middlewares/logs';
import { agentsRoutes } from './modules/agent/infra/http/routes/agents.routes';
import { categoriesRoutes } from './modules/category/infra/http/routes/categories.routes';
import { errorHandling } from './api/middlewares/errorHandling';
import { conversationsRoutes } from './modules/conversation/infra/http/routes/conversations.routes';
import { messagesRoutes } from './modules/message/infra/http/routes/messages.routes';

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

app.use(errors());
app.use(errorHandling);

app.listen(API_PORT, () => console.log(`Server listening on ${API_PORT}. `));
