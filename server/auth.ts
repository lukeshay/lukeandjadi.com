import Cookie, { SetOption } from 'cookies';
import Iron from '@hapi/iron';

export const defaultSalt = { ...Iron.defaults, ttl: 43200000 };
export const defaultSecret = process.env.JWT_SECRET || '';

export function setCookie(
  req: any,
  res: any,
  name: string,
  value?: string,
  options: SetOption = {},
) {
  const cookies = new Cookie(req, res);
  const newOptions = options;

  if (newOptions.maxAge) {
    newOptions.expires = new Date(Date.now() + newOptions.maxAge);
    newOptions.maxAge /= 1000;
  }

  newOptions.overwrite = true;

  cookies.set(name, value, options);
}

export const getCookie = (req: any, res: any, name: string) =>
  new Cookie(req, res).get(name);

export function generateJWT<T extends Object>(
  payload: T,
  secret = defaultSecret,
  salt = defaultSalt,
) {
  return Iron.seal(payload, secret, salt);
}

export async function parseJWT<T>(
  jwtToken: string,
  secret = defaultSecret,
  salt = defaultSalt,
): Promise<T | null> {
  try {
    return (await Iron.unseal(jwtToken, secret, salt)) as unknown as T;
  } catch (e) {
    console.error((e as Error).message);
  }

  return null;
}
