import express from 'express';
import { logs } from './api/middlewares/logs.js';

const app = express();

const API_PORT = process.env.PORT || process.env.port || 3333;

app.use(logs);

app.get('/:param', (req, res, next) => res.send(req.params.param));

app.listen(API_PORT, () => console.log(`Server listening on ${API_PORT}.`));
