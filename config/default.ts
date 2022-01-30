import { defaults } from '@hapi/iron';

const config = {
  database: {
    options: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
  jwt: {
    signIn: {
      salt: {
        ...defaults,
        ttl: 43200000,
      },
      cookie: 'jwt-token',
    },
    rsvp: {
      salt: {
        ...defaults,
        ttl: 1800000,
      },
      cookie: 'rsvp-jwt-token',
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

export default config;
