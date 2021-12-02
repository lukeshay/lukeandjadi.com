import axios from 'axios';
import { RSVP } from '@/entities';
import config from '@/client/config';
import middleware, { MyContext } from '@/server/middleware';
import { HttpStatusCodes } from '@lukeshay/next-middleware';
import { defaultSalt, defaultSecret, getCookie, parseJWT } from '@/server/auth';
import { RSVP_JWT_COOKIE_KEY } from '@/server/jwt';

async function put({ req, res, logger }: MyContext) {
  if (!req.body.token) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ token: 'required field' });
  }

  const { token } = req.body;

  try {
    const resp = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      undefined,
      { params: { secret: process.env.RECAPTCHA_SECRET_KEY, response: token } },
    );
    if (!resp.data.success) {
      logger.error(
        `recaptcha challenge unsuccessful: ${resp.data['error-codes']}`,
      );
      return res
        .status(HttpStatusCodes.UNAUTHORIZED)
        .json({ message: 'recaptcha challenge unsuccessful' });
    }
  } catch (e) {
    logger.error((e as Error).message, { ...(e as Error), level: 'error' });

    return res
      .status(HttpStatusCodes.UNAUTHORIZED)
      .json({ message: 'recaptcha challenge unsuccessful' });
  }

  let id: string;

  try {
    const jwt = getCookie(req, res, RSVP_JWT_COOKIE_KEY);

    if (!jwt) {
      return res
        .status(HttpStatusCodes.REQUEST_TIMEOUT)
        .json({ message: 'token expired' });
    }

    const parsed = await parseJWT<{ id: string }>(jwt, defaultSecret, {
      ...defaultSalt,
      ttl: 1800000,
    });

    if (!parsed) {
      return res
        .status(HttpStatusCodes.REQUEST_TIMEOUT)
        .json({ message: 'token expired' });
    }

    id = parsed.id;
  } catch (e) {
    logger.error((e as Error).message, { ...(e as Error), level: 'error' });

    return res
      .status(HttpStatusCodes.REQUEST_TIMEOUT)
      .json({ message: 'token expired' });
  }

  if (!req.body.name) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ name: 'required field' });
  }

  try {
    const rsvp = await RSVP.findOne({ where: { name: req.body.name, id } });

    if (!rsvp) {
      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: 'There is not an RSVP with that name.' });
    }

    const saved = await rsvp.update({ ...req.body, updatedAt: new Date() });

    return res.status(HttpStatusCodes.OK).json(saved);
  } catch (e) {
    logger.error((e as Error).message, { ...(e as Error), level: 'error' });

    return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `There was an error saving your RSVP. If this problem persists, please email ${config.email}.`,
    });
  }
}

export default middleware.put(put).handler();
