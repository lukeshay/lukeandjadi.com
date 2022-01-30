import {
  router,
  Context,
  StatusCodes,
  ContextApiWrapper,
  ContextApiHandler,
} from '@lukeshay/next-router';
import correlator from 'correlation-id';
import { isAPIError, isError } from './errors/api-error';
import { v4 } from 'uuid';
import logger from './logger';

export interface MyContext extends Context {}

const withCorrelationId = async (
  ctx: MyContext,
  next: ContextApiHandler<MyContext>,
) => {
  await correlator.withId(v4(), async () => {
    await next(ctx);
  });
};

const withErrorHandler = async (
  ctx: MyContext,
  next: ContextApiHandler<MyContext>,
) => {
  try {
    await next(ctx);
  } catch (error) {
    if (isAPIError(error)) {
      logger.info(`an error has ocurred: ${error}`, { error });

      ctx.res.status(error.statusCode).json(error.toJSON());
    } else if (isError(error)) {
      logger.info(`an unknown error has ocurred: ${error}`, { error });

      ctx.res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message, stack: error.stack, name: error.name });
    } else {
      logger.info(`an unknown error has ocurred: ${error}`, { error });

      ctx.res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'an unknown error occurred' });
    }
  }
};

const wrapper: ContextApiWrapper<MyContext> = async (req, res, handler) => {
  const ctx: MyContext = { req, res };

  await withCorrelationId(ctx, (ctx) => withErrorHandler(ctx, handler));
};

export default router<MyContext>().wrapper(wrapper);
