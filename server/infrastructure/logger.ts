import process from 'node:process';

import {createLogger, format, transports} from 'winston';
import {Logtail} from '@logtail/node';
import {LogtailTransport} from '@logtail/winston';
import correlator from 'correlation-id';

import {config} from '../../config';

const {combine, metadata, printf, timestamp, align, uncolorize} = format;

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
    /* eslint-disable @typescript-eslint/no-shadow,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/restrict-template-expressions */
    format: combine(
        metadata(),
        uncolorize(),
        timestamp({
            format: () => new Date().toISOString(),
        }),
        align(),
        printf(({timestamp, level, message, metadata}) =>
            JSON.stringify({
                level,
                message: `${timestamp} ${level}: ${message}`,
                metadata,
                timestamp,
            })
        )
    ),
    /* eslint-enable @typescript-eslint/no-shadow,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/restrict-template-expressions */
    level: 'silly',
    transports: [new transports.Console()],
});

try {
    logger.transports.push(new LogtailTransport(new Logtail(config.get<string>('logtail.sourceToken'))));
} catch {}

export default logger;
