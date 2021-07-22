import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { generateJWT } from '@/server/auth';
import { getJWTEmailHtml, getJWTEmailPlain } from '@/server/email';
import { selectAccountByEmail } from '@/entities/account';
import config from '@/server/config';
import { JWTPayload } from '@/server/jwt';
import withLogger from '@/server/with-logger';
import logger from '@/server/logger';
import { sendEmail } from '@/server/smtp';

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return post(req, res);
  }

  return res.status(StatusCodes.NOT_FOUND).end();
}

export default withLogger(handler);

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ email: 'Email is required.' });
  }

  try {
    logger.info(`selecting account from database: ${email}`);
    const account = await selectAccountByEmail(email);

    try {
      logger.info('generating jwt');
      const jwtToken = await generateJWT<JWTPayload>({
        email,
        role: account.role,
      });

      logger.info('sending jwt email');
      const html = getJWTEmailHtml(jwtToken);
      const text = getJWTEmailPlain(jwtToken);

      const result = await sendEmail({
        from: `Luke & Jadi <${config.env.emailFrom}>`,
        subject: "Sign in link for Luke & Jadi's wedding website",
        html,
        text,
        to: email,
      });

      logger.info(result[0].toString());

      return res
        .status(StatusCodes.OK)
        .json({ message: 'A email with a login link has been sent!' });
    } catch (e) {
      logger.error(e.message, { ...e, level: 'error' });

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:
          'Uh oh! It looks like there was an error. Please try again or contact us if the error continues!',
      });
    }
  } catch (e) {
    logger.error(`account with email does not exist: ${email} ${e.message}`, e);
    return res.status(StatusCodes.UNAUTHORIZED).end();
  }
}
