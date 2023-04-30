import { Pool } from 'pg';
import { dbConfig } from '../../config/dbConfig';

export const connection = new Pool(dbConfig);

connection.on('connect', () => {
  console.log('Connected with success.');
});

connection.on('error', (err) => {
  console.error('An error has occurred. ', err);
});
