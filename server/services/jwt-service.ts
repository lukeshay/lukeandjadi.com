import * as Iron from '@hapi/iron';

import { config } from '../../config';
import { Unauthorized } from '../errors/unauthorized';

type RSVPJWTPayload = { id: string };

type AccountJWTPayload = {
  email: string;
  role: 'BASIC' | 'ADMIN' | 'MASTER_ADMIN';
};

const generateJWT = <T>(payload: T, secret: string, salt: Iron.SealOptions) =>
  Iron.seal(payload, secret, salt);

const parseJWT = async <T>(
  jwtToken: string,
  secret: string,
  salt: Iron.SealOptions,
): Promise<T | null> => {
  try {
    return (await Iron.unseal(jwtToken, secret, salt)) as unknown as T;
  } catch (e) {
    console.error((e as Error).message);
  }

  return null;
};

const parseRSVPJWT = async (token: string): Promise<RSVPJWTPayload> => {
  const parsed: RSVPJWTPayload | null = await parseJWT(
    token.replace('Bearer ', ''),
    config.get('jwt.secret'),
    config.get('jwt.rsvp.salt'),
  );

  if (!parsed) {
    throw new Unauthorized('jwt could not be parsed');
  }

  return parsed;
};

const generateRSVPJWT = (payload: RSVPJWTPayload): Promise<string> =>
  generateJWT(payload, config.get('jwt.secret'), config.get('jwt.rsvp.salt'));

const parseAccountJWT = async (token: string): Promise<AccountJWTPayload> => {
  const parsed = await parseJWT<AccountJWTPayload>(
    token.replace('Bearer ', ''),
    config.get('jwt.secret'),
    config.get('jwt.signIn.salt'),
  );

  if (!parsed) {
    throw new Unauthorized('jwt could not be parsed');
  }

  return parsed;
};

const generateAccountJWT = (payload: AccountJWTPayload): Promise<string> =>
  generateJWT<AccountJWTPayload>(
    payload,
    config.get('jwt.secret'),
    config.get('jwt.signIn.salt'),
  );

export { parseRSVPJWT, generateRSVPJWT, parseAccountJWT, generateAccountJWT };
