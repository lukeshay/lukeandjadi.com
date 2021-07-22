import Cookie, { SetOption } from 'cookies';
import Iron from '@hapi/iron';

const salt = { ...Iron.defaults, ttl: 43200000 };

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

  cookies.set(name, value, options);
}

export const getCookie = (req: any, res: any, name: string) =>
  new Cookie(req, res).get(name);

export function generateJWT<T extends Object>(
  payload: T,
  secret = process.env.JWT_SECRET || '',
) {
  return Iron.seal(payload, secret, salt);
}

export async function parseJWT<T>(
  jwtToken: string,
  secret = process.env.JWT_SECRET || '',
): Promise<T | null> {
  try {
    return (await Iron.unseal(jwtToken, secret, salt)) as unknown as T;
  } catch (e) {
    console.error(e.message);
  }

  return null;
}
