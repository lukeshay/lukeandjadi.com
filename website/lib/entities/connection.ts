import knex from 'knex';

const config = {
  client: 'pg',
  connection: {
    connectionString: process.env.DSN,
    ssl: { rejectUnauthorized: false },
  },
  acquireConnectionTimeout: 4000,
  pool: { min: 0, max: 50 },
};

if (
  process.env.DSN?.includes('localhost') ||
  process.env.DSN?.includes('127.0.0.1')
) {
  // @ts-expect-error
  delete config.connection.ssl;
}

const connection = knex(config);

export default connection;
