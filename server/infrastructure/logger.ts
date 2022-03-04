import process from 'node:process';

import { createLogger, transports } from 'winston';
import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import correlator from 'correlation-id';

import { config } from '../../config';

const logger = createLogger({
  defaultMeta: {
    author: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_AUTHOR_LOGIN,
    commit: process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA,
    // eslint-disable-next-line accessor-pairs,get-off-my-lawn/prefer-arrow-functions
    get correlationId() {
      return correlator.getId();
    },
    environment: process.env.NODE_ENV,
    logger: 'winston',
    region: process.env.VERCEL_REGION,
  },
  level: 'silly',
  transports: [new transports.Console(), new LogtailTransport(new Logtail(config.get<string>('logtail.sourceToken')))],
});

export default logger;
