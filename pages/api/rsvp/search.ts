import * as yup from 'yup';
import { StatusCodes } from '@lukeshay/next-router';

import logger from '../../../server/logger';
import middleware from '../../../server/middleware';
import type { Handler } from '../../../server/middleware';
import { config } from '../../../config';
import { generateRSVPJWT } from '../../../server/services/jwt-service';
import { getRSVP } from '../../../server/services/rsvp-service';
import { setCookie } from '../../../server/auth';
import { validate } from '../../../server/services/schema-service';
import { verifyReCaptchaToken } from '../../../server/services/recaptcha-service';

const querySchema = yup.object().shape({
  name: yup.string().required(),
  token: yup.string().required(),
});

const get: Handler = async (req, res) => {
  const { name, token } = await validate(querySchema, req.query);

  await verifyReCaptchaToken(token);

  const rsvp = await getRSVP({ name });

  logger.debug(`found rsvp with the name ${name}`);

  const jwt = await generateRSVPJWT({ id: rsvp.id });

  logger.debug('setting jwt cookie');

  setCookie(req, res, config.get('jwt.rsvp.cookie'), jwt, {
    sameSite: 'strict',
    httpOnly: true,
    overwrite: true,
    maxAge: config.get<number>('jwt.rsvp.salt.ttl') * 1000,
  });

  res.status(StatusCodes.OK).json(rsvp);
};

export default middleware.get(get).handler();
