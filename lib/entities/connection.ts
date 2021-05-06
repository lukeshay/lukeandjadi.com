import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: process.env.DSN,
  acquireConnectionTimeout: 4000,
  pool: { min: 0, max: 50 },
});

export default connection;
