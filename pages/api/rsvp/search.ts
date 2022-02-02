import * as yup from 'yup';
import { StatusCodes } from '@lukeshay/next-router';

import { config } from '../../../config';
import { generateRSVPJWT } from '../../../server/services/jwt-service';
import { getRSVP } from '../../../server/services/rsvp-service';
import { setCookie } from '../../../server/auth';
import { validate } from '../../../server/services/schema-service';
import logger from '../../../server/logger';
import middleware, { Handler } from '../../../server/middleware';

const querySchema = yup.object().shape({
  name: yup.string().required(),
});

const get: Handler = async (req, res) => {
  const { name } = await validate(querySchema, req.query);

  const rsvp = await getRSVP({ name });

  logger.debug(`found rsvp with the name ${req.query.name}`);

  const jwt = await generateRSVPJWT({ id: rsvp.id });

  logger.debug('setting jwt cookie');

  setCookie(req, res, config.get('jwt.rsvp.cookie'), jwt, {
    sameSite: 'strict',
    httpOnly: true,
    overwrite: true,
    maxAge: config.get('jwt.rsvp.salt.ttl') * 1000,
  });

  res.status(StatusCodes.OK).json(rsvp);
};

export default middleware.get(get).handler();
