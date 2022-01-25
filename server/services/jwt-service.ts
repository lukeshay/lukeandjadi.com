import { defaultSecret, generateJWT, parseJWT } from '../auth';
import serverConfig from '@/server/config';
import { Unauthorized } from '../errors/unauthorized';

type RSVPJWTPayload = { id: string };

type AccountJWTPayload = {
  email: string;
  role: 'BASIC' | 'ADMIN' | 'MASTER_ADMIN';
};

const parseRSVPJWT = async (token: string): Promise<RSVPJWTPayload> => {
  const parsed = await parseJWT<RSVPJWTPayload>(
    token.replace('Bearer ', ''),
    defaultSecret,
    serverConfig.rsvpJwtSalt,
  );

  if (!parsed) {
    throw new Unauthorized('jwt could not be parsed');
  }

  return parsed;
};

const generateRSVPJWT = (payload: RSVPJWTPayload): Promise<string> =>
  generateJWT<RSVPJWTPayload>(payload, defaultSecret, serverConfig.rsvpJwtSalt);

const parseAccountJWT = async (token: string): Promise<AccountJWTPayload> => {
  const parsed = await parseJWT<AccountJWTPayload>(
    token.replace('Bearer ', ''),
    defaultSecret,
    serverConfig.rsvpJwtSalt,
  );

  if (!parsed) {
    throw new Unauthorized('jwt could not be parsed');
  }

  return parsed;
};

const generateAccountJWT = (payload: AccountJWTPayload): Promise<string> =>
  generateJWT<AccountJWTPayload>(
    payload,
    defaultSecret,
    serverConfig.rsvpJwtSalt,
  );

export { parseRSVPJWT, generateRSVPJWT, parseAccountJWT, generateAccountJWT };
