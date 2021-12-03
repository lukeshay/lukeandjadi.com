import { createLogger, format, transports } from 'winston';

const logger = createLogger({
  level: 'silly',
  exitOnError: false,
  format: format.json(),
  transports: [
    new transports.Console({
      format: format.json(),
    }),
  ],
  defaultMeta: {
    environment: process.env.VERCEL_ENV || 'local',
    commit: process.env.VERCEL_GIT_COMMIT_SHA,
    region: process.env.VERCEL_REGION,
  },
});

export default logger;
