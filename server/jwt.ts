export const JWT_COOKIE_KEY = 'jwt-token';

export interface JWTPayload {
  email: string;
  role: 'BASIC' | 'ADMIN' | 'MASTER_ADMIN';
}
