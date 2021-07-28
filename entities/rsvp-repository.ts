import { getRepository } from 'typeorm';
import { RSVP } from './rsvp';

export async function selectRSVPByName(name: string) {
  return getRepository(RSVP)
    .createQueryBuilder()
    .where('name = :name', { name })
    .getOne();
}

export function mergeRSVPs(a1: RSVP, a2: any): Readonly<Partial<RSVP>> {
  const merged = { ...a1 };

  if (a2.email) {
    merged.email = a2.email;
  }

  if (a2.guests) {
    merged.guests = a2.guests;
  }

  return merged;
}

export async function updateRSVP(rsvp: RSVP) {
  return getRepository(RSVP)
    .createQueryBuilder()
    .update(RSVP)
    .set(rsvp)
    .where('id = :id', { id: rsvp.id })
    .execute();
}
