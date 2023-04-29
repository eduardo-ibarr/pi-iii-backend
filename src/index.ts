import express from 'express';
import { logs } from './api/middlewares/logs';
import { agentRoutes } from './modules/agent/infra/http/routes/agentsRoutes';

const app = express();

const API_PORT = process.env.PORT || process.env.port || 3333;

app.use(logs);

app.use(agentRoutes);

app.listen(API_PORT, () => console.log(`Server listening on ${API_PORT}. `));
