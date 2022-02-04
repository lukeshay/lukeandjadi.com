import axios from 'axios';

import { config } from '../../config';
import { Unauthorized } from '../errors/unauthorized';
import logger from '../logger';

const RECAPTCHA_URL: string = config.get('recaptcha.url');
const RECAPTCHA_SECRET_KEY: string = config.get('recaptcha.secret');

const verifyReCaptchaToken = async (token: string): Promise<void> => {
  const res = await axios.post<{ success: boolean }>(RECAPTCHA_URL, undefined, {
    params: {
      secret: RECAPTCHA_SECRET_KEY,
      response: token,
    },
  });

  logger.info('send token to recaptcha', res.data);

  if (!res.data.success) {
    throw new Unauthorized('recaptcha challenge unsuccessful');
  }
};

export { verifyReCaptchaToken };
