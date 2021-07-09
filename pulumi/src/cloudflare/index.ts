import * as pulumi from '@pulumi/pulumi';
import * as cloudflare from '@pulumi/cloudflare';
import * as fs from 'fs';

const config = new pulumi.Config();

const emailHost = config.require('email_host');
const emailPass = config.require('email_pass');
const emailUser = config.require('email_user');
const emailFrom = config.require('email_from');

const zoneId = config.require('zone_id');
const sendgridKey = config.require('sendgrid_key');
const url = config.require('url');

const ttl = 1;

const emailerCode = fs.readFileSync(
  `${__dirname}/../../../workers/dist/emailer.js`,
  {
    encoding: 'utf-8',
  },
);

const emailerWorkerScript = new cloudflare.WorkerScript('emailer-script', {
  name: 'emailer-script',
  content: emailerCode,
  secretTextBindings: [
    { name: 'EMAIL_HOST', text: emailHost },
    { name: 'EMAIL_PASS', text: emailPass },
    { name: 'EMAIL_USER', text: emailUser },
    { name: 'EMAIL_FROM', text: emailFrom },
    { name: 'SENDGRID_KEY', text: sendgridKey },
  ],
});

const emailerWorkerRoute = new cloudflare.WorkerRoute('emailer-route', {
  zoneId,
  pattern: `${url}/emailer`,
  scriptName: emailerWorkerScript.name,
});

const vercel = new cloudflare.Record('vercel', {
  zoneId,
  name: url,
  type: 'A',
  value: '76.76.21.21',
  ttl,
  proxied: true,
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

const sendgridCNAME = new cloudflare.Record('sendgrid-cname', {
  zoneId,
  type: 'CNAME',
  name: `em6256.${url}`,
  value: 'u20293343.wl094.sendgrid.net',
  ttl,
  proxied: false,
});

const sendgridCNAME1 = new cloudflare.Record('sendgrid-cname-1', {
  zoneId,
  type: 'CNAME',
  name: `s1._domainkey.${url}`,
  value: 's1.domainkey.u20293343.wl094.sendgrid.net',
  ttl,
  proxied: false,
});

const sendgridCNAME2 = new cloudflare.Record('sendgrid-cname-2', {
  zoneId,
  type: 'CNAME',
  name: `s2._domainkey.${url}`,
  value: 's2.domainkey.u20293343.wl094.sendgrid.net',
  ttl,
  proxied: false,
});

export default {
  vercel: vercel.id,
  zoho: zoho.id,
  zoho2: zoho2.id,
  zoho3: zoho3.id,
  zohoVerification: zohoVerification.id,
  zohoSPF: zohoSPF.id,
  wwwRedirect: wwwRedirect.id,
  emailerWorkerRoute: emailerWorkerRoute.id,
  sendgridCNAME: sendgridCNAME.id,
  sendgridCNAME1: sendgridCNAME1.id,
  sendgridCNAME2: sendgridCNAME2.id,
};
