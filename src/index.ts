import runApp from './app';

if (process.env.NEW_RELIC_LICENSE_KEY) {
  // eslint-disable-next-line global-require
  const newrelic = require('newrelic');
  newrelic.instrumentWebframework('express', () => {});
}
if (process.env.ROLLBAR) {
  // eslint-disable-next-line global-require
  require('rollbar');
}
const logger = require('./service/logger').default;

process.env.TZ = 'UTC';

const appPort = process.env.PORT || 3000;

const setupCluster = async () => {
  const appData = await runApp();
  const { app } = appData;
  app.listen(appPort, () => {
    logger('info', `HTTP server is up and running on port ${appPort}`);
  });
};

setupCluster();
