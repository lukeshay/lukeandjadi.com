// Update with your config settings.

const pg = require('pg');

if (process.env.DSN && !process.env.DSN.includes('localhost')) {
  pg.defaults.ssl = true;
}

module.exports = {
  local: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DSN,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  development: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DSN,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DSN,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
    },
  },
};
