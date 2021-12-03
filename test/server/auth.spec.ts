import { defaultSalt, generateJWT, parseJWT } from '../../server/auth';
import FakeTimers from '@sinonjs/fake-timers';
import config from '../../server/config';

const JWT_SECRET = 'thisisasecretpasswordforgeneratingjwts';

const PAYLOAD = { key: 'value' };

describe('jwt', () => {
  const clock = FakeTimers.install();

  describe('generateJWT', () => {
    it('should generate a valid JWT with default salt', async () => {
      const jwt = await generateJWT(PAYLOAD, JWT_SECRET);

      expect(jwt).toBeTruthy();
      expect(jwt).not.toEqual('');
    });

    it('should generate a valid JWT with rsvp salt', async () => {
      const jwt = await generateJWT(PAYLOAD, JWT_SECRET, config.rsvpJwtSalt);

      expect(jwt).toBeTruthy();
      expect(jwt).not.toEqual('');
    });
  });

  describe('parseJWT', () => {
    it('should parse a valid JWT with default salt', async () => {
      const jwt = await generateJWT(PAYLOAD, JWT_SECRET);

      const payload = await parseJWT(jwt, JWT_SECRET);

      expect(payload).toBeTruthy();
      expect(payload).toEqual(PAYLOAD);
    });

    it('should parse a valid JWT with default salt generated a few minutes ago', async () => {
      const jwt = await generateJWT(PAYLOAD, JWT_SECRET);

      clock.tick(defaultSalt.ttl / 2);

      const payload = await parseJWT(jwt, JWT_SECRET);

      expect(payload).toBeTruthy();
      expect(payload).toEqual(PAYLOAD);
    });

    it('should not parse an expired JWT with default salt', async () => {
      const jwt = await generateJWT(PAYLOAD, JWT_SECRET);

      clock.tick(defaultSalt.ttl + 60000);

      const payload = await parseJWT(jwt, JWT_SECRET);

      expect(payload).toBeNull();
    });

    it('should parse a valid JWT with rsvp salt', async () => {
      const jwt = await generateJWT(PAYLOAD, JWT_SECRET, config.rsvpJwtSalt);

      const payload = await parseJWT(jwt, JWT_SECRET, config.rsvpJwtSalt);

      expect(payload).toBeTruthy();
      expect(payload).toEqual(PAYLOAD);
    });

    it('should parse a valid JWT with rsvp salt generated a few minutes ago', async () => {
      const jwt = await generateJWT(PAYLOAD, JWT_SECRET);

      clock.tick(config.rsvpJwtSalt.ttl / 2);

      const payload = await parseJWT(jwt, JWT_SECRET);

      expect(payload).toBeTruthy();
      expect(payload).toEqual(PAYLOAD);
    });

    it('should not parse an expired JWT with rsvp salt', async () => {
      const jwt = await generateJWT(PAYLOAD, JWT_SECRET, config.rsvpJwtSalt);

      clock.tick(config.rsvpJwtSalt.ttl + 60000);

      const payload = await parseJWT(jwt, JWT_SECRET, config.rsvpJwtSalt);

      expect(payload).toBeNull();
    });
  });

  afterAll(() => {
    clock.uninstall();
  });
});
