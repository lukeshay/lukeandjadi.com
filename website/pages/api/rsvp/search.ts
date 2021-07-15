import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import {
  withSentry,
  captureException,
  captureMessage,
  Severity,
} from '@sentry/nextjs';
import { selectRSVPByName } from '../../../lib/entities/rsvp';

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return get(req, res);
  }

  return res.status(StatusCodes.NOT_FOUND).end();
}

export default withSentry(handler);

async function get(req: NextApiRequest, res: NextApiResponse) {
  captureMessage('get /rsvp/search');

  if (!req.query.name) {
    return res.status(StatusCodes.BAD_REQUEST).json({ name: 'required field' });
  }

  try {
    const rsvp = await selectRSVPByName(req.query.name as string);

    if (!rsvp.id) {
      throw new Error(`no rsvp with the name ${req.query.name}`);
    }

    return res.status(StatusCodes.OK).json(rsvp);
  } catch (e) {
    captureMessage(
      `there was an error searching for an rsvp with the name ${req.query.name}: ${e.message}`,
      Severity.Warning,
    );
    captureException(e);

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: `no rsvp with the name ${req.query.name}` });
  }
}
