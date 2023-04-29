import { PoolConfig } from 'pg';

import { config } from 'dotenv';

config();

const {
  NODE_ENV,
  LOCAL_PG_PASSWORD,
  LOCAL_PG_USER,
  PRD_PG_PASSWORD,
  PRD_PG_USER,
  PG_DATABASE,
  LOCAL_PG_HOST,
  PRD_PG_HOST,
  PG_PORT,
} = process.env;

export const dbConfig: PoolConfig = {
  user: NODE_ENV === 'local' ? LOCAL_PG_USER : PRD_PG_USER,
  password: NODE_ENV === 'local' ? LOCAL_PG_PASSWORD : PRD_PG_PASSWORD,
  database: PG_DATABASE,
  host: NODE_ENV === 'local' ? LOCAL_PG_HOST : PRD_PG_HOST,
  port: +PG_PORT,
};
