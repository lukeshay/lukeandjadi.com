import { createConnection } from 'typeorm';
import { User } from './user';

export default createConnection({
  type: 'postgres',
  url: process.env.DSN,
  entities: [User],
});
