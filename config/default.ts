import {defaults} from '@hapi/iron';

const config = {
    database: {
        options: {
            ssl: {
                rejectUnauthorized: false,
            },
        },
        pool: {
            max: 40,
        },
        schema: 'lukeandjadi_com',
    },
    domain: 'http://localhost:3000',
    email: {
        from: 'contact@lukeandjadi.com',
    },
    jwt: {
        rsvp: {
            cookie: 'rsvp-jwt-token',
            salt: {
                ...defaults,
                ttl: 600_000,
            },
        },
    },
    recaptcha: {
        url: 'https://www.google.com/recaptcha/api/siteverify',
    },
};

export default config;
