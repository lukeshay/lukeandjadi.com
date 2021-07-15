import * as cloudflare from './src/cloudflare';

let digitalocean = null;

if (process.env.SKIP_DO !== 'true') {
  digitalocean = require('./src/digitalocean');
}

export { digitalocean, cloudflare };
