import { Account } from '@/entities';
import { generateJWT } from '@/server/auth';
import { getJWTEmailHtml, getJWTEmailPlain } from '@/server/email';
import { JWTPayload } from '@/server/jwt';
import { sendEmail } from '@/server/smtp';
import { StatusCodes } from '@lukeshay/next-router';
import config from '@/server/config';
import middleware, { MyContext } from '@/server/middleware';
import logger from '@/server/logger';

const post = async ({ req, res }: MyContext): Promise<void> => {
  const { email } = req.body;

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ email: 'Email is required.' });
  }

  try {
    logger.info(`selecting account from database: ${email}`);
    const account = await Account.findOne({ where: { email } });

    if (!account) {
      return res.status(StatusCodes.UNAUTHORIZED).json({ message: '' });
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
        .status(StatusCodes.OK)
        .json({ message: 'A email with a login link has been sent!' });
    } catch (e) {
      logger.error((e as Error).message, { ...(e as Error), level: 'error' });

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        message:
          'Uh oh! It looks like there was an error. Please try again or contact us if the error continues!',
      });
    }
  } catch (e) {
    logger.error(
      `account with email does not exist: ${email} ${(e as Error).message}`,
      e,
    );
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'unauthorized' });
  }
};

export default middleware.post(post).handler();
