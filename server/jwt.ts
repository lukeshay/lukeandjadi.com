export const JWT_COOKIE_KEY = 'jwt-token';
export const RSVP_JWT_COOKIE_KEY = 'rsvp-jwt-token';

export interface JWTPayload {
  email: string;
  role: 'BASIC' | 'ADMIN' | 'MASTER_ADMIN';
}
