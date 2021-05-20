import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { withSentry, captureException } from '@sentry/nextjs';
import {
  mergeAccounts,
  selectAccountByEmail,
  updateAccount,
} from '../../../lib/entities/account';
import { parseJWT } from '@ljw/auth';
import config from '../../../lib/client/config';

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    return put(req, res);
  }

  return res.status(StatusCodes.NOT_FOUND).end();
}

export default withSentry(handler);

async function put(req: NextApiRequest, res: NextApiResponse) {
  console.log('put /account');

  if (!req.cookies.authorization) {
    console.log('no authorization cookie found');
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }

  const { authorization } = req.cookies;

  try {
    const email = await parseJWT<string>(authorization);

    if (!email) {
      console.log('no email found in authorization cookie');
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }

    const account = await selectAccountByEmail(email);
    const merged = { ...mergeAccounts(account, req.body), email };

    try {
      const saved = await updateAccount(merged);
      return res.status(StatusCodes.OK).json(saved);
    } catch (e) {
      captureException(e);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message: `There was an error saving your account. If this problem persists, please email ${config.email}.`,
      });
    }
  } catch (e) {
    captureException(e);

    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
}
