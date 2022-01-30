import axios from 'axios';
import { config } from '../../config';

import { Unauthorized } from '../errors/unauthorized';

const RECAPTCHA_URL: string = config.get('recaptcha.url');
const RECAPTCHA_SECRET_KEY: string = config.get('recaptcha.secret');

const verifyReCaptchaToken = async (token: string): Promise<void> => {
  const res = await axios.post(RECAPTCHA_URL, undefined, {
    params: { secret: RECAPTCHA_SECRET_KEY, response: token },
  });

  if (!res.data.success) {
    throw new Unauthorized('recaptcha challenge unsuccessful');
  }
};

export { verifyReCaptchaToken };
