import { requireSession as clerkRequireSession } from '@clerk/nextjs/api';
import type { Wrapper } from '@lukeshay/next-router';
import { router, StatusCodes } from '@lukeshay/next-router';
import correlator from 'correlation-id';
import type { NextApiHandler } from 'next';
import { v4 } from 'uuid';

import { isAPIError, isError } from './errors/api-error';
import logger from './logger';

type Handler = NextApiHandler;

const requireSession = (handler: Handler): Handler => clerkRequireSession(handler) as unknown as Handler;

const withCorrelationId: Wrapper<Handler> = async (req, res, next) => {
  await correlator.withId(v4(), async () => next(req, res));
};

const withErrorHandler: Wrapper<Handler> = async (req, res, next) => {
  try {
    // eslint-disable-next-line node/callback-return
    await next(req, res);
  } catch (error) {
    if (isAPIError(error)) {
      logger.info(`an error has occurred: ${error.message}`, { error });

      res.status(error.statusCode).json(error.toJSON());
    } else if (isError(error)) {
      logger.info(`an unknown error has occurred: ${error.message}`, { error });

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: error.message,
        name: error.name,
        stack: error.stack,
      });
    } else {
      logger.info(`an unknown error has occurred`, { error });

      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'an unknown error occurred' });
    }
  }
};

const wrapper: Wrapper<Handler> = async (req, res, handler) => {
  await withCorrelationId(req, res, async (nestedReq, nestedRes) => {
    await withErrorHandler(nestedReq, nestedRes, handler);
  });
};

export type { Handler };
export { requireSession };
export default router<Handler>(wrapper);
