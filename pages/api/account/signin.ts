import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { generateJWT } from '../../../lib/be/jwt';
import { sendJWTEMail } from '../../../lib/be/email';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    return await post(req, res);
  } else {
    return res.status(StatusCodes.NOT_FOUND);
  }
};

async function post(req: NextApiRequest, res: NextApiResponse) {
  const { email } = req.body;

  if (!email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ email: 'Email is required.' });
  }

  const jwtToken = generateJWT(email);

  try {
    await sendJWTEMail(email, jwtToken);
    return res
      .status(StatusCodes.OK)
      .json({ message: 'A email with a login link has been sent!' });
  } catch (e) {
    console.error(e.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:
        'Uh oh! It looks like there was an error. Please try again or contact us if the error continues!',
    });
  }
}
