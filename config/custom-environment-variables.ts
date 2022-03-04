import process from 'node:process';

const config = {
  database: {
    url: process.env.DSN,
  },
  env: process.env.NODE_ENV,
  environment: process.env.NODE_ENV,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  logtail: {
    sourceToken: process.env.LOGTAIL_SOURCE_TOKEN,
  },
  recaptcha: {
    secret: process.env.RECAPTCHA_SECRET_KEY,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
  },
};

export default config;
