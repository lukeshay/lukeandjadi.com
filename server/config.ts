const config = {
  env: {
    domain: process.env.DOMAIN ?? 'https://lukeandjadi.com',
    emailFrom: process.env.EMAIL_FROM ?? 'contact@lukeandjadi.com',
    emailPass: process.env.EMAIL_PASS,
    emailUser: process.env.EMAIL_USER,
    emailHost: process.env.EMAIL_HOST,
  },
};

export default config;