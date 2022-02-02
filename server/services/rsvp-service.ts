import type { WhereOptions } from 'sequelize';

import { RSVP } from '../entities';
import type { RSVPAttributes } from '../../types';
import { BadRequest } from '../errors/bad-request';
import { captureChange } from './cdc-service';

const getRSVP = async (
  properties: WhereOptions<RSVPAttributes>,
): Promise<RSVPAttributes> => {
  const rsvp = await RSVP.findOne({ where: properties });

  if (!rsvp) {
    throw new BadRequest('RSVP not found');
  }

  return rsvp.get();
};

const updateRSVP = async (
  model: Parameters<typeof RSVP.update>[0],
  where: WhereOptions<RSVPAttributes>,
): Promise<RSVPAttributes> => {
  const rsvp = await RSVP.update(model, { where });

  if (!rsvp) {
    throw new BadRequest('RSVP not found');
  }

  const updatedRsvp = await getRSVP(where);

  await captureChange('rsvps', updatedRsvp.id, updatedRsvp);

  return updatedRsvp;
};

export { getRSVP, updateRSVP };
