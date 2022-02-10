import type { IncomingMessage, ServerResponse } from 'http';

import type { SetOption } from 'cookies';
import Cookies from 'cookies';

const setCookie = (
  req: IncomingMessage,
  res: ServerResponse,
  name: string,
  value?: string,
  options: SetOption = {},
): void => {
  const cookies = new Cookies(req, res);
  const newOptions = options;

  if (newOptions.maxAge) {
    newOptions.expires = new Date(Date.now() + newOptions.maxAge);
    newOptions.maxAge /= 1000;
  }

  newOptions.overwrite = true;

  cookies.set(name, value, options);
};

const getCookie = (req: IncomingMessage, res: ServerResponse, name: string): string | undefined =>
  new Cookies(req, res).get(name);

export { setCookie, getCookie };
