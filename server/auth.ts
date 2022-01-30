import Cookie, { SetOption } from 'cookies';

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
