import process from 'node:process';

import { createLogger, format, transports } from 'winston';
import correlator from 'correlation-id';

const logger = createLogger({
  defaultMeta: {
    commit: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
    region: process.env.VERCEL_REGION,
    author: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN,
    // eslint-disable-next-line accessor-pairs,get-off-my-lawn/prefer-arrow-functions
    get correlationId() {
      return correlator.getId();
    },
  },
  exitOnError: false,
  format: format.json(),
  level: 'silly',
  transports: [
    new transports.Console({
      format: format.json(),
    }),
  ],
});

export default logger;
