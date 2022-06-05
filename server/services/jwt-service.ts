import * as Iron from '@hapi/iron';

import {config} from '../../config';
import {UnauthorizedError} from '../errors/unauthorized-error';
import logger from '../infrastructure/logger';

type RSVPJWTPayload = {id: string};

const generateJWT = async <T>(payload: T, secret: string, salt: Iron.SealOptions): Promise<string> =>
    Iron.seal(payload, secret, salt);

const parseJWT = async <T>(jwtToken: string, secret: string, salt: Iron.SealOptions): Promise<T | undefined> => {
    try {
        return (await Iron.unseal(jwtToken, secret, salt)) as unknown as T;
    } catch (error) {
        logger.error((error as Error).message, error);
    }

    return undefined;
};

const parseRSVPJWT = async (token: string): Promise<RSVPJWTPayload> => {
    const parsed: RSVPJWTPayload | undefined = await parseJWT(
        token.replace('Bearer ', ''),
        config.get('jwt.secret'),
        config.get('jwt.rsvp.salt')
    );

    if (!parsed) {
        throw new UnauthorizedError('jwt could not be parsed');
    }

    return parsed;
};

const generateRSVPJWT = async (payload: RSVPJWTPayload): Promise<string> =>
    generateJWT(payload, config.get('jwt.secret'), config.get('jwt.rsvp.salt'));

export {parseRSVPJWT, generateRSVPJWT};
