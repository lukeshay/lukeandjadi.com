import * as pulumi from '@pulumi/pulumi';
import * as cloudflare from '@pulumi/cloudflare';

const config = new pulumi.Config();

const zoneId = config.require('zone_id');
const url = config.require('url');

const ttl = 1;

const vercel = new cloudflare.Record('vercel', {
  zoneId,
  name: url,
  type: 'A',
  value: '76.76.21.21',
  ttl,
  proxied: true,
});

const checkly = new cloudflare.Record('checkly', {
  zoneId,
  name: `status.${url}`,
  type: 'CNAME',
  value: 'dashboards.checklyhq.com',
  ttl,
  proxied: false,
});

const zoho = new cloudflare.Record('zoho', {
  zoneId,
  name: url,
  type: 'MX',
  value: 'mx.zoho.com',
  ttl,
  priority: 10,
});

const zoho2 = new cloudflare.Record('zoho2', {
  zoneId,
  name: url,
  type: 'MX',
  value: 'mx2.zoho.com',
  ttl,
  priority: 20,
});

const zoho3 = new cloudflare.Record('zoho3', {
  zoneId,
  name: url,
  type: 'MX',
  value: 'mx3.zoho.com',
  ttl,
  priority: 50,
});

const zohoVerification = new cloudflare.Record('zoho-verification', {
  zoneId,
  name: url,
  type: 'TXT',
  value: 'zoho-verification=zb47321756.zmverify.zoho.com',
  ttl,
});

const zohoSPF = new cloudflare.Record('zoho-spf', {
  zoneId,
  name: url,
  type: 'TXT',
  value: 'v=spf1 include:zoho.com ~all',
  ttl,
});

const wwwRedirect = new cloudflare.PageRule('www-redirect', {
  zoneId,
  target: `www.${url}/*`,
  actions: {
    forwardingUrl: {
      statusCode: 301,
      url: `https://${url}/$1`,
    },
  },
});

const con = {
  vercel: vercel.id,
  checkly: checkly.id,
  zoho: zoho.id,
  zoho2: zoho2.id,
  zoho3: zoho3.id,
  zohoVerification: zohoVerification.id,
  zohoSPF: zohoSPF.id,
  wwwRedirect: wwwRedirect.id,
};

export default con;
