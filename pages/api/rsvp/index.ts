import * as yup from 'yup';
import { StatusCodes } from '@lukeshay/next-router';

import logger from '../../../server/infrastructure/logger';
import middleware from '../../../server/infrastructure/middleware';
import type { Handler } from '../../../server/infrastructure/middleware';
import { config } from '../../../config';
import { getCookie } from '../../../server/services/cookie-service';
import { getRSVP, updateRSVP } from '../../../server/services/rsvp-service';
import { parseRSVPJWT } from '../../../server/services/jwt-service';
import { RequestTimeoutError } from '../../../server/errors/request-timeout-error';
import { validate } from '../../../server/services/schema-service';
import { verifyReCaptchaToken } from '../../../server/services/recaptcha-service';

const bodySchema = yup.object().shape({
  email: yup.string().email().required(),
  guests: yup.number().min(0).max(yup.ref('maxGuests')).required(),
  maxGuests: yup.number().positive().required(),
  name: yup.string().required(),
  token: yup.string().required(),
});

const put: Handler = async (req, res) => {
  const jwt = getCookie(req, res, config.get('jwt.rsvp.cookie'));

  if (!jwt) {
    logger.error('no jwt cookie found');

    throw new RequestTimeoutError('no jwt cookie found');
  }

  logger.error('parsing jwt');

  const { id } = await parseRSVPJWT(jwt);
  const { maxGuests } = await getRSVP({ id });
  const { token, email, guests, name } = await validate(bodySchema, {
    ...req.body,
    maxGuests,
  });
  const userAgent = req.headers['user-agent'];

  logger.info('validating token', {
    email,
    guests,
    maxGuests,
    name,
    token,
    userAgent,
  });

  await verifyReCaptchaToken(token);

  logger.info('updating rsvp');

  const saved = await updateRSVP(
    {
      email,
      guests,
      name,
      userAgent,
    },
    {
      id,
      name,
    },
  );

  res.status(StatusCodes.OK).json(saved);
};

export default middleware.put(put).handler();
