import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { parseJWT } from '../../../lib/be/jwt';
import { selectAccountByEmail } from '../../../lib/entities/user';
import { setCookie } from '../../../lib/be/cookie';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return post(req, res);
  }

  return res.status(StatusCodes.NOT_FOUND).end();
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  console.log('POST /account/auth');

  const { token } = req.body;

  if (!token) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ email: 'Token is required.' });
  }

  const email = await parseJWT(token);

  if (!email) {
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }

  try {
    const account = await selectAccountByEmail(email);

    setCookie(res, 'authorization', token);

    return res.status(StatusCodes.OK).json(account);
  } catch (e) {
    console.error(e.message);
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
}
