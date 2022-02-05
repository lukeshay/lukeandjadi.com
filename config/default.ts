import { defaults } from '@hapi/iron';

const config = {
  database: {
    options: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: {
      max: 40,
    },
    schema: 'lukeandjadi_com',
  },
  jwt: {
    signIn: {
      salt: {
        ...defaults,
        ttl: 43_200_000,
      },
      cookie: 'jwt-token',
    },
    rsvp: {
      salt: {
        ...defaults,
        ttl: 1_800_000,
      },
      cookie: 'rsvp-jwt-token',
    },
  },
  recaptcha: {
    url: 'https://www.google.com/recaptcha/api/siteverify',
  },
  domain: 'http://localhost:3000',
  email: {
    from: 'contact@lukeandjadi.com',
  },
};

export default config;
