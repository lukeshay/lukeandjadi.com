import * as yup from 'yup';
import { StatusCodes } from '@lukeshay/next-router';

import { config } from '../../../config';
import { getCookie } from '../../../server/auth';
import { parseRSVPJWT } from '../../../server/services/jwt-service';
import { RequestTimeout } from '../../../server/errors/request-timeout';
import { updateRSVP } from '../../../server/services/rsvp-service';
import { validate } from '../../../server/services/schema-service';
import { verifyReCaptchaToken } from '../../../server/services/recaptcha-service';
import logger from '../../../server/logger';
import middleware, { MyContext } from '../../../server/middleware';

const bodySchema = yup.object().shape({
  token: yup.string().required(),
  name: yup.string().required(),
  email: yup.string().email().required(),
  guests: yup.number().positive().required(),
});

const put = async ({ req, res }: MyContext) => {
  const { token, email, guests, name } = await validate(bodySchema, req.body);

  logger.info('validating token');

  await verifyReCaptchaToken(token);

  logger.info('getting jwt cookie');

  const jwt = getCookie(req, res, config.get('jwt.rsvp.cookie'));

  if (!jwt) {
    logger.error('no jwt cookie found');

    throw new RequestTimeout('no jwt cookie found');
  }

  logger.error('parsing jwt');

  const { id } = await parseRSVPJWT(jwt);

  logger.info('updating rsvp');

  const saved = await updateRSVP({ email, guests, name }, { name, id });

  return res.status(StatusCodes.OK).json(saved);
};

export default middleware.put(put).handler();
