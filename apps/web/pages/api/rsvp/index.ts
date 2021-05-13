import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import {
  mergeAccounts,
  selectAccountByEmail,
  updateAccount,
} from '../../../lib/entities/account';
import {
  mergeRSVPs,
  selectRSVPByName,
  updateRSVP,
} from '../../../lib/entities/rsvp';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    return put(req, res);
  }

  return res.status(StatusCodes.NOT_FOUND).end();
}

async function put(req: NextApiRequest, res: NextApiResponse) {
  console.log('put /rsvp');

  if (!req.body.name) {
    return res.status(StatusCodes.BAD_REQUEST).json({ name: 'required field' });
  }

  try {
    const rsvp = await selectRSVPByName(req.body.name);
    const merged = mergeRSVPs(rsvp, req.body);
    const saved = await updateRSVP(merged);

    return res.status(StatusCodes.OK).json(saved);
  } catch (e) {
    console.log(e.message);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message:
        'There was an error saving your RSVP. If this problem persists, please email luke@lukeandjadi.com!',
    });
  }
}
