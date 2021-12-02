import { generateJWT } from '@/server/auth';
import { getJWTEmailHtml, getJWTEmailPlain } from '@/server/email';
import config from '@/server/config';
import { JWTPayload } from '@/server/jwt';
import { sendEmail } from '@/server/smtp';
import { Account } from '@/entities';
import middleware, { MyContext } from '@/server/middleware';
import { HttpStatusCodes } from '@lukeshay/next-middleware';

async function post({ req, res, logger }: MyContext) {
  const { email } = req.body;

  if (!email) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ email: 'Email is required.' });
  }

  try {
    logger.info(`selecting account from database: ${email}`);
    const account = await Account.findOne({ where: { email } });

    if (!account) {
      return res.status(HttpStatusCodes.UNAUTHORIZED).json({ message: '' });
    }

    try {
      logger.info('generating jwt');
      const jwtToken = await generateJWT<JWTPayload>({
        email,
        role: account.get().role,
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
        .status(HttpStatusCodes.OK)
        .json({ message: 'A email with a login link has been sent!' });
    } catch (e) {
      logger.error((e as Error).message, { ...(e as Error), level: 'error' });

      return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
        message:
          'Uh oh! It looks like there was an error. Please try again or contact us if the error continues!',
      });
    }
  } catch (e) {
    logger.error(`account with email does not exist: ${email} ${(e as Error).message}`, e);
    return res.status(HttpStatusCodes.UNAUTHORIZED).end();
  }
}

export default middleware.post(post).handler();
