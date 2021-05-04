import jwt from 'jsonwebtoken';

export function generateJWT(email: string): string {
  const date = new Date();
  
  date.setHours(date.getHours() + 12);

  return jwt.sign({ email, expiration: date }, process.env.JWT_SECRET || "");
}
