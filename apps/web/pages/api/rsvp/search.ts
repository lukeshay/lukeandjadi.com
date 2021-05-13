import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { selectRSVPByName } from '../../../lib/entities/rsvp';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return get(req, res);
  }

  return res.status(StatusCodes.NOT_FOUND).end();
}

async function get(req: NextApiRequest, res: NextApiResponse) {
  console.log('get /rsvp/search');

  if (!req.query.name) {
    return res.status(StatusCodes.BAD_REQUEST).json({ name: 'required field' });
  }

  try {
    const rsvp = await selectRSVPByName(req.query.name as string);
    return res.status(StatusCodes.OK).json(rsvp);
  } catch (e) {
    console.error(e.message);

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `no rsvp with the name ${req.query.name}` });
  }
}
