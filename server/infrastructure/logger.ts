import process from 'node:process';

import { createLogger, format, transports } from 'winston';
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
  exitOnError: false,
  format: format.json(),
  level: 'silly',
  transports: [
    new transports.Console({
      format: format.prettyPrint(),
    }),
  ],
});

try {
  logger.transports.push(new LogtailTransport(new Logtail(config.get<string>('logtail.sourceToken'))));

  logger.info('Added Logtail transport');
} catch {}

try {
  logger.transports.push(
    new transports.Http({
      format: format.json(),
      host: 'http-intake.logs.datadoghq.com',
      path: `/api/v2/logs?dd-api-key=${config.get<string>('datadog.apiKey')}&ddsource=nodejs&service=lukeandjadi.com`,
      ssl: true,
    }),
  );

  logger.info('Added Datadog transport');
} catch {}

export default logger;
