import Chance from 'chance';
import {install} from '@sinonjs/fake-timers';
import type {InstalledClock} from '@sinonjs/fake-timers';

import {generateRSVPJWT, parseRSVPJWT} from '../../../server/services/jwt-service';

const chance = new Chance();

describe('jwt service', () => {
    describe('generateRSVPJWT', () => {
        test('should generate a JWT', async () => {
            const payload = {
                id: chance.guid(),
            };

            const token = await generateRSVPJWT(payload);

            expect(token).toBeDefined();
        });

        describe('after time', () => {
            let clock: InstalledClock;

            beforeEach(() => {
                clock = install();
            });

            afterEach(() => {
                clock.uninstall();
            });

            test('should expire after 11 minutes', async () => {
                const payload = {
                    id: chance.guid(),
                };

                const token = await generateRSVPJWT(payload);

                clock.tick('11:01');

                // eslint-disable-next-line jest/require-to-throw-message
                await expect(parseRSVPJWT(token)).rejects.toThrow();
            });

            test('should not expire before 10 minutes', async () => {
                const payload = {
                    id: chance.guid(),
                };

                const token = await generateRSVPJWT(payload);

                const minutes = String(
                    chance.integer({
                        max: 9,
                        min: 0,
                    })
                ).padStart(2, '0');

                const seconds = String(
                    chance.integer({
                        max: 59,
                        min: 0,
                    })
                ).padStart(2, '0');

                clock.tick(`${minutes}:${seconds}`);

                const result = await parseRSVPJWT(token);

                expect(result).toStrictEqual(payload);
            });
        });
    });
});
