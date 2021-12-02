import { RSVP } from '@/entities';
import {
  generateJWT,
  defaultSecret,
  defaultSalt,
  setCookie,
} from '@/server/auth';
import { RSVP_JWT_COOKIE_KEY } from '@/server/jwt';
import middleware, { MyContext } from '@/server/middleware';
import { HttpStatusCodes } from '@lukeshay/next-middleware';
import serverConfig from '@/server/config';

async function get({ req, res, logger }: MyContext) {
  if (!req.query.name) {
    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ name: 'required field' });
  }

  try {
    const rsvp = await RSVP.findOne({ where: { name: req.query.name } });

    if (!rsvp?.get().id) {
      throw new Error(`no rsvp with the name ${req.query.name}`);
    }

    const jwt = await generateJWT({ id: rsvp.get().id }, defaultSecret, serverConfig.rsvpJwtSalt);

    setCookie(req, res, RSVP_JWT_COOKIE_KEY, jwt, {
      sameSite: 'strict',
      httpOnly: true,
      overwrite: true,
      path: '/',
    });

    return res.status(HttpStatusCodes.OK).json(rsvp);
  } catch (e) {
    logger.error(
      `there was an error searching for an rsvp with the name ${
        req.query.name
      }: ${(e as Error).message}`,
      e,
    );

    return res
      .status(HttpStatusCodes.BAD_REQUEST)
      .json({ message: `no rsvp with the name ${req.query.name}` });
  }
}

export default middleware.get(get).handler();
