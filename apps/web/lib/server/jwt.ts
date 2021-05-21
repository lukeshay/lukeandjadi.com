import { AccountRole } from '../entities/account';

export const JWT_COOKIE_KEY = 'jwt-token';

export interface JWTPayload {
  email: string;
  role: AccountRole;
}
