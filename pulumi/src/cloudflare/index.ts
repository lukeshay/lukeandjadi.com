import * as pulumi from '@pulumi/pulumi';
import * as cloudflare from '@pulumi/cloudflare';

const pulumiConfig = new pulumi.Config();

const zoneId = pulumiConfig.require('zone_id');
const url = pulumiConfig.require('url');

const ttl = 1;

const vercel = new cloudflare.Record('vercel', {
  name: url,
  proxied: true,
  ttl,
  type: 'A',
  value: '76.76.21.21',
  zoneId,
});

const checkly = new cloudflare.Record('checkly', {
  name: `status.${url}`,
  proxied: false,
  ttl,
  type: 'CNAME',
  value: 'dashboards.checklyhq.com',
  zoneId,
});

const zoho = new cloudflare.Record('zoho', {
  name: url,
  priority: 10,
  ttl,
  type: 'MX',
  value: 'mx.zoho.com',
  zoneId,
});

const zoho2 = new cloudflare.Record('zoho2', {
  name: url,
  priority: 20,
  ttl,
  type: 'MX',
  value: 'mx2.zoho.com',
  zoneId,
});

const zoho3 = new cloudflare.Record('zoho3', {
  name: url,
  priority: 50,
  ttl,
  type: 'MX',
  value: 'mx3.zoho.com',
  zoneId,
});

const zohoVerification = new cloudflare.Record('zoho-verification', {
  name: url,
  ttl,
  type: 'TXT',
  value: 'zoho-verification=zb47321756.zmverify.zoho.com',
  zoneId,
});

const zohoSPF = new cloudflare.Record('zoho-spf', {
  name: url,
  ttl,
  type: 'TXT',
  value: 'v=spf1 include:zoho.com ~all',
  zoneId,
});

const wwwRedirect = new cloudflare.PageRule('www-redirect', {
  actions: {
    forwardingUrl: {
      statusCode: 301,
      url: `https://${url}/$1`,
    },
  },
  target: `www.${url}/*`,
  zoneId,
});

const clerkAccounts = new cloudflare.Record('clerk-accounts', {
  name: `accounts.${url}`,
  proxied: false,
  ttl,
  type: 'CNAME',
  value: 'accounts.clerk.services',
  zoneId,
});

const clerkFrontendApi = new cloudflare.Record('clerk-frontend-api', {
  name: `clerk.${url}`,
  proxied: false,
  ttl,
  type: 'CNAME',
  value: 'frontend-api.clerk.services',
  zoneId,
});

const clerkDomainKeyOne = new cloudflare.Record('clerk-domain-key-one', {
  name: `clk._domainkey.${url}`,
  proxied: false,
  ttl,
  type: 'CNAME',
  value: 'dkim1.x6h252afudo0.clerk.services',
  zoneId,
});

const clerkDomainKeyTwo = new cloudflare.Record('clerk-domain-key-two', {
  name: `clk2._domainkey.${url}`,
  proxied: false,
  ttl,
  type: 'CNAME',
  value: 'dkim2.x6h252afudo0.clerk.services',
  zoneId,
});

const clerkMail = new cloudflare.Record('clerk-mail', {
  name: `clkmail.${url}`,
  proxied: false,
  ttl,
  type: 'CNAME',
  value: 'mail.x6h252afudo0.clerk.services',
  zoneId,
});

const checklyId = checkly.id;
const clerkAccountsId = clerkAccounts.id;
const clerkDomainKeyOneId = clerkDomainKeyOne.id;
const clerkDomainKeyTwoId = clerkDomainKeyTwo.id;
const clerkFrontendApiId = clerkFrontendApi.id;
const clerkMailId = clerkMail.id;
const vercelId = vercel.id;
const wwwRedirectId = wwwRedirect.id;
const zoho2Id = zoho2.id;
const zoho3Id = zoho3.id;
const zohoId = zoho.id;
const zohoSPFId = zohoSPF.id;
const zohoVerificationId = zohoVerification.id;

export {
  checklyId,
  clerkAccountsId,
  clerkDomainKeyOneId,
  clerkDomainKeyTwoId,
  clerkFrontendApiId,
  clerkMailId,
  vercelId,
  wwwRedirectId,
  zoho2Id,
  zoho3Id,
  zohoId,
  zohoSPFId,
  zohoVerificationId,
};
