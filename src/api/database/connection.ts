import { Pool } from 'pg';
import { dbConfig } from 'config/dbConfig';

export const connection = new Pool(dbConfig);

connection.on('connect', () => {
  connection.query('CREATE DATABASE IF NOT EXISTS pi_iii', (err, res) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Database created successfully!');
    }
  });
});
connection.on('error', (err) => {
  console.error('An error has occurred. ', err);
});
