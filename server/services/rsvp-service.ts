import type { WhereOptions } from 'sequelize';

import { RSVP } from '../entities';
import type { RSVPAttributes } from '../../types';
import { BadRequestError } from '../errors/bad-request-error';

import { captureChange } from './cdc-service';

const getRSVP = async (properties: WhereOptions<RSVPAttributes>): Promise<RSVPAttributes> => {
  const rsvp = await RSVP.findOne({ where: properties });

  if (!rsvp) {
    throw new BadRequestError('RSVP not found');
  }

  return rsvp.get();
};

const updateRSVP = async (
  model: Parameters<typeof RSVP.update>[0],
  where: WhereOptions<RSVPAttributes>,
): Promise<RSVPAttributes> => {
  const [updated] = await RSVP.update(model, { where });

  if (!updated) {
    throw new BadRequestError('RSVP not found');
  }

  const updatedRsvp = await getRSVP(where);

  await captureChange('rsvps', updatedRsvp.id, updatedRsvp);

  return updatedRsvp;
};

export { getRSVP, updateRSVP };
