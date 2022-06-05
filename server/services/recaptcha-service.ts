import axios from 'axios';

import {config} from '../../config';
import {UnauthorizedError} from '../errors/unauthorized-error';
import logger from '../infrastructure/logger';

const RECAPTCHA_URL: string = config.get('recaptcha.url');
const RECAPTCHA_SECRET_KEY: string = config.get('recaptcha.secret');

const verifyReCaptchaToken = async (token: string): Promise<void> => {
    logger.info('verifying recaptcha token', {token});

    const res = await axios.post<{success: boolean}>(RECAPTCHA_URL, undefined, {
        params: {
            response: token,
            secret: RECAPTCHA_SECRET_KEY,
        },
    });

    logger.info('recaptcha response', res.data);

    if (!res.data.success) {
        throw new UnauthorizedError('recaptcha challenge unsuccessful');
    }
};

export {verifyReCaptchaToken};
