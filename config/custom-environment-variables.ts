const config = {
  database: {
    url: process.env.DSN,
  },
  env: process.env.NODE_ENV,
  environment: process.env.NODE_ENV,
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  recaptcha: {
    secret: process.env.RECAPTCHA_SECRET,
  },
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY,
  },
};

export default config;
