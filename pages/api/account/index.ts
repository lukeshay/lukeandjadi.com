import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { parseJWT } from '../../../lib/be/jwt';
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
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }

  const { authorization } = req.cookies;

  try {
    const email = await parseJWT(authorization);

    if (!email) {
      return res.status(StatusCodes.UNAUTHORIZED).end();
    }

    const account = await selectAccountByEmail(email);
    const merged = { ...mergeAccounts(account, req.body), email };

    const saved = await updateAccount(merged);
    return res.status(StatusCodes.OK).json(saved);
  } catch (e) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
}
