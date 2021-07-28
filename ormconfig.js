module.exports = {
  type: 'cockroachdb',
  url: process.env.DSN,
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
  migrations: [__dirname + '/migrations/*.ts'],
};
