import process from 'node:process';

import { createLogger, format, transports } from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import correlator from 'correlation-id';

const logger = createLogger({
  defaultMeta: {
    author: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN,
    commit: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    // eslint-disable-next-line accessor-pairs,get-off-my-lawn/prefer-arrow-functions
    get correlationId() {
      return correlator.getId();
    },
    environment: process.env.NEXT_PUBLIC_VERCEL_ENV,
    logger: 'winston',
    region: process.env.VERCEL_REGION,
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

if (process.env.LOGTAIL_SOURCE_TOKEN) {
  const logtail = new Logtail(process.env.LOGTAIL_SOURCE_TOKEN);

  logger.transports.push(new LogtailTransport(logtail));
}

export default logger;
