import { createConnection, getConnectionOptions } from 'typeorm';
import { Account } from './account';
import { RSVP } from './rsvp';

export async function initializeConnection() {
  const connectionOptions = await getConnectionOptions();

  return await createConnection({
    ...connectionOptions,
    entities: [Account, RSVP],
  } as any);
}
