import connection from './connection';

export interface RSVP {
  id: string;
  name: string;
  email?: string;
  guests?: number;
}

export const RSVPs = () => connection.table<RSVP>('rsvps');

export async function selectRSVPByName(name: string): Promise<Readonly<RSVP>> {
  return (await RSVPs().where('name', name))[0];
}

export async function selectRSVPByID(id: string): Promise<Readonly<RSVP>> {
  return (await RSVPs().where('id', id))[0];
}

export async function updateRSVP({
  id,
  email,
  guests,
  name,
}: RSVP): Promise<Readonly<RSVP>> {
  await RSVPs()
    .update({
      email,
      guests,
      name,
    })
    .where({ id });
  return selectRSVPByID(id);
}

export function mergeRSVPs(a1: RSVP, a2: any): Readonly<RSVP> {
  const merged = { ...a1 };

  if (a2.email) {
    merged.email = a2.email;
  }

  if (a2.guests) {
    merged.guests = a2.guests;
  }

  return merged;
}

export const selectAllRSVPs = (): Promise<ReadonlyArray<RSVP>> => RSVPs();
