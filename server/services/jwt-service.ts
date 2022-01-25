import { defaultSecret, generateJWT, parseJWT } from '../auth';
import serverConfig from '@/server/config';
import { Unauthorized } from '../errors/unauthorized';

type RSVPJWTPayload = { id: string };

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

export { parseRSVPJWT, generateRSVPJWT };
