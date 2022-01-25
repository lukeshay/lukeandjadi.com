import axios from 'axios';
import { Unauthorized } from '../errors/unauthorized';

const RECAPTCHA_URL = 'https://www.google.com/recaptcha/api/siteverify';

const verifyReCaptchaToken = async (token: string): Promise<void> => {
  const res = await axios.post(RECAPTCHA_URL, undefined, {
    params: { secret: process.env.RECAPTCHA_SECRET_KEY, response: token },
  });

  if (!res.data.success) {
    throw new Unauthorized('recaptcha challenge unsuccessful');
  }
};

export { verifyReCaptchaToken };
