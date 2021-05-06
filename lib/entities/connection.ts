import knex from 'knex';

const connection = knex({
  client: 'pg',
  connection: {
    connectionString: process.env.DSN,
    ssl: { rejectUnauthorized: false },
  },
  acquireConnectionTimeout: 4000,
  pool: { min: 0, max: 50 },
});

export default connection;
