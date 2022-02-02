import { router, StatusCodes, Wrapper } from '@lukeshay/next-router';
import correlator from 'correlation-id';
import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 } from 'uuid';

import { isAPIError, isError } from './errors/api-error';
import logger from './logger';

export type Handler = (
  req: NextApiRequest,
  res: NextApiResponse,
) => Promise<void> | void;

const withCorrelationId: Wrapper<Handler> = async (req, res, next) => {
  await correlator.withId(v4(), async () => {
    await next(req, res);
  });
};

const withErrorHandler: Wrapper<Handler> = async (req, res, next) => {
  try {
    await next(req, res);
  } catch (error) {
    if (isAPIError(error)) {
      logger.info(`an error has ocurred: ${error}`, { error });

      res.status(error.statusCode).json(error.toJSON());
    } else if (isError(error)) {
      logger.info(`an unknown error has ocurred: ${error}`, { error });

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message, stack: error.stack, name: error.name });
    } else {
      logger.info(`an unknown error has ocurred: ${error}`, { error });

      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'an unknown error occurred' });
    }
  }
};

const wrapper: Wrapper<Handler> = async (req, res, handler) => {
  await withCorrelationId(req, res, async (req, res) => {
    await withErrorHandler(req, res, handler);
  });
};

export default router<Handler>(wrapper);
