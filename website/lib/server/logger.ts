import { createLogger, format, transports } from 'winston';

const httpTransportOptions = {
  host: 'http-intake.logs.datadoghq.com',
  path: '/v1/input/835c1967ce70dd16a042e47d45aabda9?ddsource=nodejs&service=lukeandjadi',
  ssl: true,
};

const logger = createLogger({
  level: 'info',
  exitOnError: false,
  format: format.json(),
  transports: [new transports.Http(httpTransportOptions)],
  defaultMeta: {
    environment: process.env.VERCEL_ENV || "local",
    commit: process.env.VERCEL_GIT_COMMIT_SHA,
    region: process.env.VERCEL_REGION,
  },
});

export default logger;
