import axios from 'axios';
import { RSVP } from '@/entities';
import config from '@/client/config';
import serverConfig from '@/server/config';
import middleware, { MyContext } from '@/server/middleware';
import { HttpStatusCodes } from '@lukeshay/next-middleware';
import { defaultSecret, getCookie, parseJWT } from '@/server/auth';
import { RSVP_JWT_COOKIE_KEY } from '@/server/jwt';

async function put({ req, res, logger }: MyContext) {
  if (!req.body.token) {
    logger.error('no token provided');

    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ token: 'required field' });
  }

  const { token } = req.body;

  try {
    logger.info('validating token');

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
    logger.info('getting jwt cookie');

    const jwt = getCookie(req, res, RSVP_JWT_COOKIE_KEY);

    if (!jwt) {
      logger.error('no jwt cookie found');

      return res
        .status(HttpStatusCodes.REQUEST_TIMEOUT)
        .json({ message: 'token expired' });
    }

    logger.error('parsing jwt');

    const parsed = await parseJWT<{ id: string }>(
      jwt,
      defaultSecret,
      serverConfig.rsvpJwtSalt,
    );

    if (!parsed) {
      logger.error('jwt could not be parsed');

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
    logger.info('required field name is not set');

    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ name: 'required field' });
  }

  try {
    logger.info('finding rsvp by name and id');

    const rsvp = await RSVP.findOne({ where: { name: req.body.name, id } });

    if (!rsvp) {
      logger.error(`rsvp not found with name: ${req.body.name} and id: ${id}`);

      return res
        .status(HttpStatusCodes.BAD_REQUEST)
        .json({ message: 'There is not an RSVP with that name.' });
    }

    logger.info('updating rsvp');
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
