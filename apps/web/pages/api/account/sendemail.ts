import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { sendJWTEMail } from '../../../lib/server/email';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return post(req, res);
  }

  return res.status(StatusCodes.NOT_FOUND).end();
}

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { to, subject, html, password } = req.body;

  if (
    !to ||
    !subject ||
    !html ||
    !password ||
    password !== process.env.EMAIL_PASS
  ) {
    res.status(StatusCodes.BAD_REQUEST).json({
      to: 'To is required.',
      subject: 'Subject is required.',
      html: 'HTML is required.',
    });
    return;
  }

  res.status(StatusCodes.OK).end();

  try {
    await sendJWTEMail(to, subject, html);
  } catch (e) {
    console.error(e);
  }
}
