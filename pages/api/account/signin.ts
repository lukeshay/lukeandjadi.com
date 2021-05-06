import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import { generateJWT } from '../../../lib/be/jwt';
import { getJWTEmailHtml } from '../../../lib/be/email';
import {
  AccountRole,
  insertAccount,
  selectAccountByEmail,
} from '../../../lib/entities/user';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return post(req, res);
  }

  return res.status(StatusCodes.NOT_FOUND).end();
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  console.log(process.env.DSN);

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ email: 'Email is required.' });
  }

  try {
    console.log(`selecting account from database: ${email}`);
    await selectAccountByEmail(email);
  } catch (_) {
    console.log(`adding account to database: ${email}`);
    try {
      // @ts-expect-error
      await insertAccount({
        email,
        ceremony: false,
        reception: false,
        role: AccountRole.Basic,
      });
    } catch (e) {
      console.error(e.message);
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).end();
    }
  }

  console.log('generating jwt');
  const jwtToken = generateJWT(email);

  try {
    console.log('sending jwt email');
    const jwtEmail = getJWTEmailHtml(jwtToken);

    await axios.post(`${process.env.REDIRECT_URI}/api/account/sendemail`, {
      html: jwtEmail,
      to: email,
      subject: "Sign in link for Luke & Jadi's wedding",
      password: process.env.EMAIL_PASS,
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: 'A email with a login link has been sent!' });
  } catch (e) {
    console.error(e.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:
        'Uh oh! It looks like there was an error. Please try again or contact us if the error continues!',
    });
  }
}
