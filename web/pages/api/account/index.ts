import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { parseJWT } from '../../../lib/server/jwt';
import {
  mergeAccounts,
  selectAccountByEmail,
  updateAccount,
} from '../../../lib/entities/user';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    return put(req, res);
  }

  return res.status(StatusCodes.NOT_FOUND).end();
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  console.log('put /account');

  if (!req.cookies.authorization) {
    console.log('no authorization cookie found');
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }

  const { authorization } = req.cookies;

  try {
    const email = await parseJWT(authorization);

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
      console.log(e.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:
          'There was an error saving your account. If this problem persists, please email luke@lukeandjadi.com!',
      });
    }
  } catch (e) {
    console.log(e.message);
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
}