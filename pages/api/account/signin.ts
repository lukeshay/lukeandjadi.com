import { StatusCodes } from '@lukeshay/next-router';
import * as yup from 'yup';

import { generateJWT } from '../../../server/auth';
import { getAccount } from '../../../server/services/account-service';
import { JWTPayload } from '../../../server/jwt';
import { sendJWTEmail } from '../../../server/services/email-service';
import { validate } from '../../../server/services/schema-service';
import logger from '../../../server/logger';
import middleware, { MyContext } from '../../../server/middleware';
import { generateAccountJWT } from '@/server/services/jwt-service';

const bodySchema = yup.object().shape({
  email: yup.string().email().required(),
});

const post = async ({ req, res }: MyContext): Promise<void> => {
  const { email } = await validate(bodySchema, req.body);

  logger.info(`selecting account from database: ${email}`);

  const { role } = await getAccount({ email });

  logger.info('generating jwt');

  const jwtToken = await generateAccountJWT({ email, role });

  logger.info('sending jwt email');

  const result = await sendJWTEmail(email, jwtToken);

  logger.info(result.toString());

  return res
    .status(StatusCodes.OK)
    .json({ message: 'A email with a login link has been sent!' });
};

export default middleware.post(post).handler();
