import { sync } from '@/entities';
import { StatusCodes } from 'http-status-codes';
import { NextApiRequest, NextApiResponse } from 'next';
import logger from './logger';

export default function withLogger(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
  ) => Promise<unknown> | unknown,
) {
  sync();

  return async function (req: NextApiRequest, res: NextApiResponse) {
    let result = null;

    try {
      result = await handler(req, res);
    } catch (e) {
      logger.error(e.message, { ...e, level: 'error' });

      result = res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }

    logger.debug(`${req.method?.toUpperCase()} ${req.url} ${res.statusCode}`);

    return result;
  };
}
