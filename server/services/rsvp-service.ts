import type { Model, WhereOptions } from 'sequelize';

import { RSVP } from '../entities';
import type { RSVPAttributes, RSVPCreationAttributes } from '../../types';
import { BadRequest } from '../errors/bad-request';

const getRSVP = async (
  properties: WhereOptions<RSVPAttributes>,
): Promise<Model<RSVPAttributes, RSVPCreationAttributes>> => {
  const rsvp = await RSVP.findOne({ where: properties });

  if (!rsvp) {
    throw new BadRequest('RSVP not found');
  }

  return rsvp;
};

const updateRSVP = async (
  model: Parameters<typeof RSVP.update>[0],
  where: WhereOptions<RSVPAttributes>,
): Promise<Model<RSVPAttributes, RSVPCreationAttributes>> => {
  const rsvp = await getRSVP(where);

  const updated = await rsvp.update(model);

  return updated;
};

export { getRSVP, updateRSVP };
