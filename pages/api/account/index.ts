import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { parseJWT } from '@/server/auth';
import {
  Account,
  mergeAccounts,
  selectAccountByEmail,
  updateAccount,
} from '@/entities';
import config from '@/client/config';
import { JWTPayload } from '@/server/jwt';
import logger from '@/server/logger';
import withLogger from '@/server/with-logger';

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    return put(req, res);
  }

  return res.status(StatusCodes.NOT_FOUND).end();
}

export default withLogger(handler);

async function put(req: NextApiRequest, res: NextApiResponse) {
  if (!req.cookies.authorization) {
    logger.info('no authorization cookie found');
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }

  const { authorization } = req.cookies;

  try {
    const payload = await parseJWT<JWTPayload>(authorization);

    if (!payload) {
      logger.info('no email found in authorization cookie');
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }

    const { email } = payload;

    const account = await selectAccountByEmail(email);

    if (!account) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'No account with that email.' });
    }

    const merged = { ...mergeAccounts(account, req.body), email };

    try {
      const saved = await updateAccount(new Account(merged));
      return res.status(StatusCodes.OK).json(saved);
    } catch (e) {
      logger.error(e.message);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `There was an error saving your account. If this problem persists, please email ${config.email}.`,
      });
    }
  } catch (e) {
    logger.error(e.message);

    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
}
