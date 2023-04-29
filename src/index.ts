import 'express-async-errors';
import express from 'express';
import { logs } from './api/middlewares/logs';
import { agentRoutes } from './modules/agent/infra/http/routes/agents.routes';
import { errors } from 'celebrate';
import { errorHandling } from '@api/middlewares/errorHandling';

const app = express();

const API_PORT = process.env.PORT || process.env.port || 3333;

app.use(express.json());

app.use(logs);

app.use('/agents', agentRoutes);

app.use(errors());
app.use(errorHandling);

app.listen(API_PORT, () => console.log(`Server listening on ${API_PORT}. `));
