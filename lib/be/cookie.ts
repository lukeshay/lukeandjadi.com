import { serialize, CookieSerializeOptions } from 'cookie';
import { NextApiResponse } from 'next';

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {},
) => {
  const stringValue =
    typeof value === 'object' ? `j:${JSON.stringify(value)}` : String(value);

  const newOptions = options;

  if (newOptions.maxAge) {
    newOptions.expires = new Date(Date.now() + newOptions.maxAge);
    newOptions.maxAge /= 1000;
  }

  res.setHeader('Set-Cookie', serialize(name, String(stringValue), newOptions));
};
