module.exports = {
  database: {
    options: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  jwt: {
    salt: {
      ttl: 43200000,
    },
  },
  recaptcha: {
    url: 'https://www.google.com/recaptcha/api/siteverify',
  },
  domain: 'http://localhost:8080',
  email: {
    from: 'contact@lukeandjadi.com',
  },
};
