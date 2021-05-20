import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import axios from 'axios';
import { generateJWT } from '@ljw/auth';
import { withSentry, captureException } from '@sentry/nextjs';
import { getJWTEmailHtml, getJWTEmailPlain } from '../../../lib/server/email';
import { selectAccountByEmail } from '../../../lib/entities/account';
import config from '../../../lib/client/config';

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return post(req, res);
  }

  return res.status(StatusCodes.NOT_FOUND).end();
}

export default withSentry(handler);

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
    const account = await selectAccountByEmail(email);

    console.log('generating jwt');
    const jwtToken = generateJWT({ email, role: account.role });

    try {
      console.log('sending jwt email');
      const html = getJWTEmailHtml(jwtToken);
      const text = getJWTEmailPlain(jwtToken);

      const r = await axios.post(`${process.env.EMAIL_SENDER_URL}/email`, {
        html,
        text,
        to: email,
        subject: "Sign in link for Luke & Jadi's wedding",
        from: `Luke & Jadi <${config.email}>`,
        pass: process.env.EMAIL_PASS,
        user: process.env.EMAIL_USER,
        host: process.env.EMAIL_HOST,
      });

      console.log(r.data);

      return res
        .status(StatusCodes.OK)
        .json({ message: 'A email with a login link has been sent!' });
    } catch (e) {
      captureException(e);

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:
          'Uh oh! It looks like there was an error. Please try again or contact us if the error continues!',
      });
    }
  } catch (e) {
    console.log(`account with email does not exist: ${email}`);
    console.error(e.message);
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
}
