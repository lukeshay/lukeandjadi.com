const video = require('wdio-video-reporter');

exports.config = {
  runner: 'local',
  specs: ['./test/specs/**/*'],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      maxInstances: 5,
      browserName: 'chrome',
      acceptInsecureCerts: true,
    },
  ],
  logLevel: 'info',
  bail: 0,
  outputDir: './output',
  baseUrl: 'http://localhost:3000',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['spec', 'junit', 'json', video],
  mochaOpts: {
    require: ['@babel/register'],
    ui: 'bdd',
    timeout: 60000,
  },
};
