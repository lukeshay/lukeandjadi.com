import type {WhereOptions} from 'sequelize-cockroachdb';

import {RSVP, RSVPVariant} from '../entities';
import type {RSVPAttributes, RSVPVariantAttributes} from '../../types';
import {BadRequestError} from '../errors/bad-request-error';

import {captureChange} from './cdc-service';

const getRSVP = async (properties: WhereOptions<RSVPAttributes>): Promise<RSVPAttributes> => {
    const rsvp = await RSVP.findOne({where: properties});

    if (!rsvp) {
        throw new BadRequestError('RSVP not found');
    }

    return rsvp.get();
};

const getRSVPByVariant = async (properties: WhereOptions<RSVPVariantAttributes>): Promise<RSVPAttributes> => {
    const rsvpVariant = await RSVPVariant.findOne({where: properties});

    if (!rsvpVariant) {
        throw new BadRequestError('RSVP not found');
    }

    return getRSVP({id: rsvpVariant.get().rsvpId});
};

const getRSVPByName = async (name: string): Promise<RSVPAttributes> =>
    getRSVPByVariant({variant: name.toLowerCase().trim()});

new Date().getSeconds();

const updateRSVP = async (
    model: Parameters<typeof RSVP.update>[0],
    where: WhereOptions<RSVPAttributes>
): Promise<RSVPAttributes> => {
    const [updated] = await RSVP.update(
        {
            ...model,
            updatedAt: new Date(),
        },
        {where}
    );

    if (!updated) {
        throw new BadRequestError('RSVP not found');
    }

    const updatedRsvp = await getRSVP(where);

    await captureChange('rsvps', updatedRsvp.id, updatedRsvp);

    return updatedRsvp;
};

export {getRSVP, updateRSVP, getRSVPByName};
