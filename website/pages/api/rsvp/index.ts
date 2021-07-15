import { NextApiRequest, NextApiResponse } from 'next';
import { StatusCodes } from 'http-status-codes';
import { withSentry, captureException, captureMessage } from '@sentry/nextjs';
import axios from 'axios';
import {
  mergeRSVPs,
  selectRSVPByName,
  updateRSVP,
} from '../../../lib/entities/rsvp';
import config from '../../../lib/client/config';

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PUT') {
    return put(req, res);
  }

  return res.status(StatusCodes.NOT_FOUND).end();
}

export default withSentry(handler);

async function put(req: NextApiRequest, res: NextApiResponse) {
  captureMessage('put /rsvp');

  if (!req.body.token) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ token: 'required field' });
  }

  const { token } = req.body;

  try {
    const resp = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      undefined,
      { params: { secret: process.env.RECAPTCHA_SECRET_KEY, response: token } },
    );
    if (!resp.data.success) {
      captureMessage(
        `recaptcha challenge unsuccessful: ${resp.data['error-codes']}`,
      );
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'recaptcha challenge unsuccessful' });
    }
  } catch (e) {
    captureException(e);

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'recaptcha challenge unsuccessful' });
  }

  if (!req.body.name) {
    return res.status(StatusCodes.BAD_REQUEST).json({ name: 'required field' });
  }

  try {
    const rsvp = await selectRSVPByName(req.body.name);
    const merged = mergeRSVPs(rsvp, req.body);
    const saved = await updateRSVP(merged);

    return res.status(StatusCodes.OK).json(saved);
  } catch (e) {
    captureException(e);

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: `There was an error saving your RSVP. If this problem persists, please email ${config.email}.`,
    });
  }
}
