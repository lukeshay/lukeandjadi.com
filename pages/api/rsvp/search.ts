import * as yup from 'yup';
import { StatusCodes } from '@lukeshay/next-router';

import { setCookie } from '../../../server/auth';
import { RSVP_JWT_COOKIE_KEY } from '../../../server/jwt';
import middleware, { MyContext } from '../../../server/middleware';
import serverConfig from '../../../server/config';
import logger from '../../../server/logger';
import { validate } from '../../../server/services/schema-service';
import { getRSVP } from '../../../server/services/rsvp-service';
import { generateRSVPJWT } from '../../../server/services/jwt-service';

const querySchema = yup.object().shape({
  name: yup.string().required(),
});

const get = async ({ req, res }: MyContext) => {
  const { name } = await validate(querySchema, req.query);

  const rsvp = await getRSVP({ name });

  logger.debug(`found rsvp with the name ${req.query.name}`);

  const jwt = await generateRSVPJWT({ id: rsvp.get().id });

  logger.debug('setting jwt cookie');

  setCookie(req, res, RSVP_JWT_COOKIE_KEY, jwt, {
    sameSite: 'strict',
    httpOnly: true,
    overwrite: true,
    maxAge: serverConfig.rsvpJwtSalt.ttl * 1000,
  });

  return res.status(StatusCodes.OK).json(rsvp);
};

export default middleware.get(get).handler();
