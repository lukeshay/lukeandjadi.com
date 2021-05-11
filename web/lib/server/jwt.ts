import jwt from 'jsonwebtoken';

export function generateJWT(email: string): string {
  const date = new Date();

  date.setHours(date.getHours() + 12);

  return jwt.sign({ email }, process.env.JWT_SECRET || '', {
    expiresIn: '12h',
  });
}

export async function parseJWT(jwtToken: string): Promise<string | null> {
  try {
    const decoded = jwt.verify(jwtToken, process.env.JWT_SECRET || '') as any;

    if (decoded.email) {
      return decoded.email;
    }
  } catch (e) {
    console.error(e.message);
  }

  return null;
}
