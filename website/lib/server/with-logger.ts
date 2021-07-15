import { NextApiRequest, NextApiResponse } from 'next';
import logger from './logger';

export default function withLogger(
  handler: (
    req: NextApiRequest,
    res: NextApiResponse,
  ) => Promise<unknown> | unknown,
) {
  return async function (req: NextApiRequest, res: NextApiResponse) {
    try {
      return await handler(req, res);
    } catch (e) {
      logger.error(e.message, e);
      throw e;
    }
  };
}
