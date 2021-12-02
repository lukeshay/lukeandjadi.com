import logger from './logger';
import {
  Middleware,
  Context,
  HttpStatusCodes,
} from '@lukeshay/next-middleware';

export interface MyContext extends Context {
  logger: typeof logger;
}

export default new Middleware<MyContext>().wrapper(
  async (req, res, handler) => {
    try {
      await handler({ req, res, logger });
    } catch (e) {
      logger.error((e as Error).message, { ...(e as Error), level: 'error' });

      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR);
    }

    logger.debug(`${req.method?.toUpperCase()} ${req.url} ${res.statusCode}`);
  },
);
