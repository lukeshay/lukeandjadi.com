import {defineConfig} from 'cypress';

const config = defineConfig({
    e2e: {
        baseUrl: 'https://lukeandjadi.com',
    },
});

export default config;
