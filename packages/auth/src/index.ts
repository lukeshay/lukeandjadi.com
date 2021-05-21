import Cookie, { SetOption } from 'cookies';
import jwt from 'jsonwebtoken';

export function setCookie(
  req: any,
  res: any,
  name: string,
  value?: string,
  options: SetOption = {}
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

export const generateJWT = (
  payload: any,
  secret = process.env.JWT_SECRET || '',
  expiresIn = 43200 // 12h in seconds
) =>
  jwt.sign(
    { ...payload, exp: Math.floor(Date.now() / 1000) + expiresIn },
    secret
  );

export async function parseJWT<T>(
  jwtToken: string,
  secret = process.env.JWT_SECRET || ''
): Promise<T | null> {
  try {
    return (jwt.verify(jwtToken, secret) as unknown) as T;
  } catch (e) {
    console.error(e.message);
  }

  return null;
}
